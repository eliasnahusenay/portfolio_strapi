# Portfolio Project

Full stack portfolio project. The technologies used are: Strapi, React JS.

## Strapi CMS

- Strapi serves as backend for blog page and contact form submission. The blog content type is created and whenever the blog is added from backend it will be fetched in the frontend.
- Contact submission form is also use strapi and the data submitted in the frontend contact form. It will be added to the backend.


***Deleting Content type***

- Due to erroneous content type configuration and corrupt content type and db. The following steps saves  the day:

**Step one**

Select all entries and export as JSON by going in to Strapi-> Content manager -> [the content type. Eg, Blog or whatever]

**Step two**

Backup your schema files:

```bash
cp -r src/api/blog ~/blog_backup
```
**Step three**

Delete the content type:

- Stop server and delete the api folder:

```bash
rm -rf src/api/blog
```
Clear cache:

```bash
rm -rf .cache build dist
```
**Step four**

 Run:

```bash
npm run develop
```

and Recreate the content type from Admin UI:




Frontend dependency used for the form submission:
```shell
npm install react-icons formik yup axios
```





