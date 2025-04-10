import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Converts image file to Base64
const getImageAsBase64 = (imagePath) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    fetch(imagePath)
      .then(res => res.blob())
      .then(blob => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
  });

const generateResumePDF = async (resumeContent) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  let y = 20;

  const addText = (text, x, yPos, options = {}) => {
    const { fontSize = 10, fontStyle = 'normal', align = 'left' } = options;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.text(text, x, yPos, { align });
    return doc.getTextDimensions(text).h + 2;
  };

  const addSectionTitle = (title) => {
    addText(title, margin, y, { fontSize: 12, fontStyle: 'bold' });
    y += 6;
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  const checkPageSpace = (spaceNeeded = 20) => {
    if (y + spaceNeeded > 280) {
      doc.addPage();
      y = 20;
    }
  };

  // HEADER: Add profile image
  if (resumeContent.personalInfo.photo) {
    const profileBase64 = await getImageAsBase64(resumeContent.personalInfo.photo);
    doc.addImage(profileBase64, 'JPEG', pageWidth / 2 - 15, y, 30, 30);
    y += 35;
  }

  addText(resumeContent.personalInfo.name, pageWidth / 2, y, {
    fontSize: 18,
    fontStyle: 'bold',
    align: 'center'
  });
  y += 8;

  addText(resumeContent.personalInfo.title, pageWidth / 2, y, {
    fontSize: 12,
    align: 'center'
  });
  y += 8;

  const contactInfo = `${resumeContent.personalInfo.email} | ${resumeContent.personalInfo.phone} | ${resumeContent.personalInfo.location}`;
  addText(contactInfo, pageWidth / 2, y, { fontSize: 10, align: 'center' });
  y += 6;

  const links = `LinkedIn: ${resumeContent.personalInfo.linkedin} | GitHub: ${resumeContent.personalInfo.github}`;
  addText(links, pageWidth / 2, y, { fontSize: 10, align: 'center' });
  y += 10;

  // QR Code (Optional)
  if (resumeContent.personalInfo.qrCode) {
    const qrBase64 = await getImageAsBase64(resumeContent.personalInfo.qrCode);
    doc.addImage(qrBase64, 'PNG', pageWidth - 35, y, 20, 20);
  }

  // SUMMARY
  if (resumeContent.personalInfo.summary) {
    addSectionTitle('SUMMARY');
    y += addText(resumeContent.personalInfo.summary, margin, y);
    y += 4;
  }

  // EXPERIENCE
  if (resumeContent.experience?.length) {
    addSectionTitle('PROFESSIONAL EXPERIENCE');
    resumeContent.experience.forEach((exp) => {
      checkPageSpace(20);
      addText(`${exp.position}, ${exp.company}`, margin, y, { fontStyle: 'bold' });
      addText(exp.duration, pageWidth - margin, y, { align: 'right' });
      y += 6;
      y += addText(exp.description, margin + 4, y);
      y += 4;
    });
  }

  // EDUCATION
  if (resumeContent.education?.length) {
    addSectionTitle('EDUCATION');
    resumeContent.education.forEach((edu) => {
      checkPageSpace(15);
      addText(edu.degree, margin, y, { fontStyle: 'bold' });
      addText(edu.year, pageWidth - margin, y, { align: 'right' });
      y += 6;
      y += addText(edu.institution, margin, y);
      y += 4;
    });
  }

  // SKILLS
  if (resumeContent.featuredSkills?.length) {
    addSectionTitle('FEATURED SKILLS');
    resumeContent.featuredSkills.forEach((skill) => {
      checkPageSpace(12);
      addText(`${skill.name} (${skill.percentage}%)`, margin, y, { fontStyle: 'bold' });
      y += addText(skill.description, margin + 4, y);
      y += 4;
    });
  }

  return doc;
};

export const saveResumePDF = async (resumeContent) => {
  const doc = await generateResumePDF(resumeContent);
  const fileName = `${resumeContent.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

export default generateResumePDF;
