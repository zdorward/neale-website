import { type SchemaTypeDefinition } from 'sanity'
import { homePage, aboutPage, contactPage, practiceArea } from './schemaTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, contactPage, practiceArea],
}
