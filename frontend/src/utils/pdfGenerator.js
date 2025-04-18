import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const generateResumePDF = async (resumeData) => {
  try {
    const { personalInfo, skills, experience, education, tools } = resumeData;

    // Create new document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Set document properties
    doc.setProperties({
      title: `${personalInfo.name} - Resume`,
      author: personalInfo.name,
      subject: "Resume",
      keywords: "resume, cv, portfolio"
    });

    // Define colors
    const colors = {
      primary: [41, 98, 255],    // Blue - #2962FF
      secondary: [33, 33, 33],   // Dark Gray - #212121
      accent: [0, 150, 136],     // Teal - #009688
      light: [224, 224, 224],    // Light Gray - #E0E0E0
      white: [255, 255, 255],    // White - #FFFFFF
      text: [97, 97, 97]         // Text Gray - #616161
    };

    // Add styled header background
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, 210, 40, 'F');

    // Add profile information with white text
    doc.setFontSize(24);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text(personalInfo.name, 20, 20);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(personalInfo.title, 20, 30);

    // Add contact information in a styled section
    const contactY = 50;
    doc.setFillColor(...colors.light);
    doc.rect(0, 40, 210, 25, 'F');

    doc.setFontSize(10);
    doc.setTextColor(...colors.secondary);
    doc.setFont("helvetica", "bold");

    // Contact info with icons
    // Create a promise to load all icons first
    const loadIcons = async () => {
      const icons = [
        { src: personalInfo.email.icon, x: 20, y: contactY - 5, text: personalInfo.email.text, textX: 30 },
        { src: personalInfo.phone.icon, x: 85, y: contactY - 5, text: personalInfo.phone.text, textX: 95 },
        { src: personalInfo.location.icon, x: 150, y: contactY - 5, text: personalInfo.location.text, textX: 160 }
      ];

      for (const icon of icons) {
        try {
          const img = new Image();
          img.src = icon.src;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          // Add icon image
          doc.addImage(img, 'PNG', icon.x, icon.y, 8, 8);

          // Add text next to icon
          doc.text(icon.text, icon.textX, contactY);
        } catch (error) {
          console.error(`Error adding icon for ${icon.text}:`, error);
          // Fallback: just add text without icon
          doc.text(`${icon.text}`, icon.x, contactY);
        }
      }
    };

    // Wait for icons to be loaded and added
    await loadIcons();

    // Add profile photo if available
    if (personalInfo.photo) {
      try {
        const img = new Image();
        img.src = personalInfo.photo;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Create circular mask effect by adding white background first
        doc.setFillColor(...colors.white);
        doc.circle(170, 20, 15, 'F');

        // Then add the image
        doc.addImage(img, 'JPEG', 155, 5, 30, 30);
      } catch (error) {
        console.error("Error adding profile image:", error);
      }
    }

    // Add summary with section styling
    const summaryY = 75;
    doc.setFillColor(...colors.primary);
    doc.rect(0, summaryY - 10, 210, 8, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("SUMMARY", 20, summaryY - 5);

    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(personalInfo.summary, 170);
    doc.text(summaryLines, 20, summaryY + 5);

    // Add experience section with similar styling
    let yPosition = summaryY + 15 + (summaryLines.length * 5);

    doc.setFillColor(...colors.primary);
    doc.rect(0, yPosition - 10, 210, 8, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", 20, yPosition - 5);
    yPosition += 10;

    experience.forEach((exp, index) => {
      // Check if we need to add a new page
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }

      // Timeline connector
      if (index > 0 && yPosition > 30) {
        doc.setDrawColor(...colors.light);
        doc.setLineWidth(0.5);
        doc.line(20, yPosition - 15, 20, yPosition);
      }

      // Position bullet
      doc.setFillColor(...colors.accent);
      doc.circle(20, yPosition, 2, 'F');

      // Position details
      doc.setFontSize(12);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      doc.text(exp.position, 25, yPosition);

      doc.setFontSize(10);
      doc.setTextColor(...colors.primary);
      doc.text(`${exp.company} - ${exp.period || exp.duration}`, 25, yPosition + 6);

      doc.setFontSize(9);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(exp.description, 160);
      doc.text(descLines, 25, yPosition + 12);

      yPosition += 20 + (descLines.length * 5);
    });

    // Add education section
    yPosition += 5;

    // Check if we need to add a new page
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFillColor(...colors.primary);
    doc.rect(0, yPosition - 10, 210, 8, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 20, yPosition - 5);
    yPosition += 10;

    // Create a grid layout for education
    const eduColumns = 2;
    const eduWidth = 80;
    const eduGap = 10;

    education.forEach((edu, index) => {
      // Check if education will fit on current page, if not add a new page
      const rowIndex = Math.floor(index / eduColumns);
      if (yPosition + (rowIndex * 25) > 260) {
        doc.addPage();
        yPosition = 20;
      }

      const colIndex = index % eduColumns;
      const adjustedRowIndex = Math.floor((index - (rowIndex * eduColumns)) / eduColumns);
      const xPos = 20 + (colIndex * (eduWidth + eduGap));
      const yPos = yPosition + (adjustedRowIndex * 25);

      // Education box with styling
      doc.setFillColor(...colors.light);
      doc.roundedRect(xPos, yPos - 5, eduWidth, 20, 2, 2, 'F');

      // Degree (truncate if too long)
      doc.setFontSize(10);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      const degreeText = doc.splitTextToSize(edu.degree, eduWidth - 8);
      doc.text(degreeText[0], xPos + 4, yPos);

      // Institution (truncate if too long and ensure it fits within box)
      doc.setFontSize(9);
      doc.setTextColor(...colors.primary);
      const institutionLines = doc.splitTextToSize(edu.institution, eduWidth - 8);
      // Only use first line to prevent overflow
      doc.text(institutionLines[0], xPos + 4, yPos + 6);

      // Year
      doc.setFontSize(8);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "normal");
      doc.text(edu.year, xPos + 4, yPos + 12);
    });

    // Update y position based on education rows
    yPosition += 25 * Math.ceil(education.length / eduColumns) + 15;

    // Check if we need to add a new page for skills
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    // Add skills section
    doc.setFillColor(...colors.primary);
    doc.rect(0, yPosition - 10, 210, 8, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", 20, yPosition - 5);
    yPosition += 10;

    // Create skills table manually
    if (skills.length > 0) {
      // Table header
      doc.setFillColor(...colors.primary);
      doc.rect(20, yPosition - 5, 170, 8, 'F');

      doc.setFontSize(10);
      doc.setTextColor(...colors.white);
      doc.setFont("helvetica", "bold");
      doc.text("Skill", 25, yPosition);
      doc.text("Proficiency", 120, yPosition);

      yPosition += 8;

      // Table rows
      skills.forEach((skill, index) => {
        // Check if we need to add a new page for skills overflow
        if (yPosition + (index * 12) > 260) {
          doc.addPage();
          yPosition = 20;

          // Redraw the header on the new page
          doc.setFillColor(...colors.primary);
          doc.rect(20, yPosition - 5, 170, 8, 'F');

          doc.setFontSize(10);
          doc.setTextColor(...colors.white);
          doc.setFont("helvetica", "bold");
          doc.text("Skill", 25, yPosition);
          doc.text("Proficiency", 120, yPosition);

          yPosition += 8;
          index = 0; // Reset the index for proper row positioning
        }

        const rowY = yPosition + (index * 12);

        // Alternate row background
        if (index % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(20, rowY - 5, 170, 10, 'F');
        }

        // Skill name
        doc.setFontSize(9);
        doc.setTextColor(...colors.text);
        doc.setFont("helvetica", "normal");
        doc.text(skill.name, 25, rowY);

        // Skill percentage
        const percentage = skill.percentage || skill.level;
        doc.text(`${percentage}%`, 120, rowY);

        // Skill bar background
        doc.setFillColor(...colors.light);
        doc.roundedRect(140, rowY - 2, 35, 3, 1, 1, 'F');

        // Skill bar progress
        doc.setFillColor(...colors.accent);
        doc.roundedRect(140, rowY - 2, 35 * (percentage/100), 3, 1, 1, 'F');
      });

      yPosition += (skills.length * 12) + 10;
    }

    // Check if we need to add a new page for tools section
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    // Add tools section with descriptive label instead of icons
    doc.setFillColor(...colors.primary);
    doc.rect(0, yPosition - 10, 210, 8, 'F');

    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("TOOLS & TECHNOLOGIES", 20, yPosition - 5);
    yPosition += 10;

    // Create a grid of tool badges without problematic icons
    const toolColumns = 3;
    const toolWidth = 50;
    const toolGap = 5;
    const toolHeight = 15;

    tools.forEach((tool, index) => {
      const colIndex = index % toolColumns;
      const rowIndex = Math.floor(index / toolColumns);
      const xPos = 20 + (colIndex * (toolWidth + toolGap));
      const yPos = yPosition + (rowIndex * (toolHeight + 8));

      // Tool badge
      doc.setFillColor(...colors.light);
      doc.roundedRect(xPos, yPos, toolWidth, toolHeight, 2, 2, 'F');

      // Tool name
      doc.setFontSize(8);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "normal");
      // Center the text in the badge
      doc.text(tool.name, xPos + toolWidth/2, yPos + toolHeight/2, {
        align: 'center',
        baseline: 'middle'
      });
    });

    // Add footer to all pages
    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Footer line
      doc.setDrawColor(...colors.light);
      doc.setLineWidth(0.5);
      doc.line(20, 285, 190, 285);

      // Footer text
      doc.setFontSize(8);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "italic");
      doc.text(`${personalInfo.name} - Resume - Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });

      // Add QR code on last page if available
      if (i === pageCount && personalInfo.qrCode) {
        try {
          const img = new Image();
          img.src = personalInfo.qrCode;
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          doc.addImage(img, 'PNG', 170, 245, 25, 25);

          // QR code caption
          doc.setFontSize(7);
          doc.text("Scan for digital portfolio", 182.5, 275, { align: 'center' });
        } catch (error) {
          console.error("Error adding QR code:", error);
        }
      }
    }

    // Save the PDF
    doc.save(`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

export default generateResumePDF;