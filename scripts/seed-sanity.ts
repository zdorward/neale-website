import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vezgyowy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('Seeding Sanity with initial content...')

  // Home Page
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroHeadline: 'Appellate Litigation in California',
    heroDescription: 'Over 800 appeals litigated. Practicing in all six California appellate districts. Recognized as a Super Lawyer and recipient of the Paul Bell Award.',
    aboutHeading: 'Appellate Excellence Since 2007',
    aboutText: 'I combine appellate intellectual rigor with empathic problem-solving skills to deliver outstanding representation. Specializing in civil, dependency, and delinquency appeals, I work with clients across California to achieve the best possible outcomes.',
  })
  console.log('✓ Home Page')

  // About Page
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    introParagraph: 'Neale Gold is the principal attorney at Law Offices of Neale Gold, Professional Corporation, an appellate law firm in San Diego, California. She specializes in civil, dependency, and delinquency appeals, working with, and for, individual clients across the entire state.',
    experienceHeading: 'Experience & Recognition',
    experienceText: [
      {
        _type: 'block',
        _key: 'exp1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'exp1span',
            text: 'Neale practices in all six appellate districts within California, and has previously been a member of the 9th Circuit Bar. She is a member of the United States Supreme Court Bar. She has maintained a busy appellate practice since 2007, having litigated over 800 appeals.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'exp2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'exp2span',
            text: 'Neale specializes in reviewing trial court records, researching and analyzing the law, and preparing appellate motions and briefs. She has been recognized for her outstanding representation on appeal, including the honor of receiving the prestigious Paul Bell Award. Starting in 2023 to present, Neale was selected as a "Super Lawyer," and given the designation as a top rated appellate attorney.',
            marks: [],
          },
        ],
      },
    ],
    education: [
      'J.D., California Western School of Law, 2003',
      'Member, United States Supreme Court Bar',
      'Admitted to all six California Appellate Districts',
      'Former Member, 9th Circuit Bar',
    ],
    awards: [
      'Paul Bell Award recipient',
      'Super Lawyer designation (2023–present)',
      'Top Rated Appellate Attorney',
    ],
  })
  console.log('✓ About Page')

  // Contact Page
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    headerText: "Let's discuss your appeal",
    officeAddress: '402 W. Broadway\nSuite 400\nSan Diego, California 92101',
    phone: '(858) 344-0747',
    email: 'nealegold@ngoldlaw.com',
    confidentialityNote: 'All communications are treated with the utmost confidentiality. The information you share will only be used to evaluate your case and will not be disclosed to third parties.',
  })
  console.log('✓ Contact Page')

  // Practice Areas
  const practiceAreas = [
    {
      _id: 'practiceArea-appeals',
      _type: 'practiceArea',
      title: 'Appeals',
      slug: { _type: 'slug', current: 'appeals' },
      description: 'Neale will review the trial court record, select appellate issues for review, research and write appellate briefs, present oral argument, and file petitions for rehearing, or review in the California Supreme Court.',
      featured: true,
      order: 1,
    },
    {
      _id: 'practiceArea-writs',
      _type: 'practiceArea',
      title: 'Statutory & Common Law Writs',
      slug: { _type: 'slug', current: 'writs' },
      description: 'Neale will prepare original or statutory writs where an appellate remedy is unavailable and the client is seeking extraordinary and emergency relief from the Court of Appeal, concerning a trial court order.',
      featured: true,
      order: 2,
    },
    {
      _id: 'practiceArea-research',
      _type: 'practiceArea',
      title: 'Legal Research, Law, & Motion',
      slug: { _type: 'slug', current: 'research' },
      description: 'Neale will provide research on any relevant legal issue, assist in setting up an issue in trial court proceedings for appropriate appellate preservation, and prepare relevant pleadings or motions.',
      featured: true,
      order: 3,
    },
    {
      _id: 'practiceArea-problem-solving',
      _type: 'practiceArea',
      title: 'Creative Problem Solving',
      slug: { _type: 'slug', current: 'problem-solving' },
      description: 'Neale will use the combination of her appellate intellectual rigor with her empathic social work skills to assist clients with creative problem solving, sometimes outside the box of litigating an appeal.',
      featured: false,
      order: 4,
    },
  ]

  for (const area of practiceAreas) {
    await client.createOrReplace(area)
    console.log(`✓ Practice Area: ${area.title}`)
  }

  console.log('\n✅ Seeding complete!')
}

seed().catch(console.error)
