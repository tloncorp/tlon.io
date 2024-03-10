import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'menu',
  title: 'Header & Footer navigation',
  icon: MenuIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Only used internally here in Sanity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      title: 'Links',
      of: [{type: 'linkBlock'}],
    }),
  ],
})
