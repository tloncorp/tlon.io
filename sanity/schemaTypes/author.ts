import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Post authors',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Only used internally here on Sanity to make things easier',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'urbitId',
      title: 'Urbit ID',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .custom((name) => {
            if (typeof name === 'undefined') return true
            // @ts-ignore
            return name.startsWith('~') ? true : 'Must start with ~'
          })
          .error(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL for author page',
      options: {
        source: 'urbitId',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Avatar',
      description: 'Image must be square',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.imageRef',
    },
  },
})
