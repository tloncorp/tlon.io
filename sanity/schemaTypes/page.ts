import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Pages',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'meta',
      title: 'Meta info',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Title alignment',
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
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used in site url',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    {
      title: 'Title',
      name: 'metaTitle',
      description: 'Title for browser tab and search results',
      type: 'string',
      group: 'meta',
    },
    {
      title: 'Description',
      name: 'metaDescription',
      description: 'Description for search results. Max 180 characters.',
      type: 'text',
      group: 'meta',
      validation: (rule) => rule.max(180),
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
