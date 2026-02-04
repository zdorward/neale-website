import { groq } from 'next-sanity'

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroHeadline,
  heroDescription,
  aboutHeading,
  aboutText
}`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  photo,
  introParagraph,
  experienceHeading,
  experienceText,
  education,
  awards
}`

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  headerText,
  officeAddress,
  phone,
  email,
  confidentialityNote
}`

export const practiceAreasQuery = groq`*[_type == "practiceArea"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  order
}`

export const featuredPracticeAreasQuery = groq`*[_type == "practiceArea" && featured == true] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description
}`
