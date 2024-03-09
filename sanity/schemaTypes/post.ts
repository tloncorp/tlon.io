import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Posts',
  icon: DocumentsIcon,
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
      validation: (rule) =>
        rule.required().max(100).warning("The description shouldn't be longer than 100 characters"),
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'blockImage',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
      group: 'content',
      description: 'Used on the homepage list as well as start of each post',
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
      description:
        'Optionally replace the automatically generated title with a custom one for this post/page.',
      type: 'string',
      group: 'meta',
    },
    {
      title: 'Description',
      name: 'metaDescription',
      description: 'Optionally replace the global generic description. Max 180 characters.',
      type: 'text',
      group: 'meta',
      validation: (rule) => rule.max(180),
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage.imageRef',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
