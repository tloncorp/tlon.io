export default {
  name: 'blockVideo',
  type: 'object',
  title: 'Video Block',
  fields: [
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Video thumbnail',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Video title',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'Video URL',
      validation: (rule: any) => rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail'
    }
  },
}