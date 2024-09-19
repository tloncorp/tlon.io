import {defineType} from 'sanity'

export default defineType({
  name: 'homeCard',
  title: 'Home Cards',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    },
    {
      name: 'cardType',
      title: 'Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Hero', value: 'hero'},
          {title: 'Story', value: 'story'},
          {title: 'Feature', value: 'feature'},
          {title: 'Footer', value: 'footer'},
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'bodyMinimized',
      title: 'Body Minimized',
      type: 'text',
      description: 'A shorter version of the body text',
    },
    {
      name: 'media',
      title: 'Photo or Video',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Photo', value: 'photo'},
              {title: 'Video', value: 'video'},
            ],
          },
          validation: (rule: any) => rule.required(),
        },
        {
          name: 'photo',
          title: 'Photo',
          type: 'image',
          hidden: ({parent}: any) => parent?.type !== 'photo',
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          hidden: ({parent}: any) => parent?.type !== 'video',
        },
      ],
    },
    {
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (rule: any) => rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
        {
          name: 'openNewWindow',
          title: 'Open in New Window',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'cardType',
      media: 'media.photo',
    },
  },
})