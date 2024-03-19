import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'globalContent',
  title: 'Homepage',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Homepage Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Homepage Title alignment',
      description: 'Choose to horizontally align the title',
      name: 'titleAlignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
  },
})
