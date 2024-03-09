export default {
  name: 'blockVideo',
  type: 'object',
  title: 'Video Block',
  fields: [
    {
      name: 'video',
      type: 'file',
      title: 'Video',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'poster',
          type: 'image',
          title: 'Video thumbnail',
          validation: (rule: any) => rule.required(),
        },
        {
          name: 'width',
          type: 'number',
          title: 'Native width?',
          validation: (rule: any) => rule.required(),
        },
        {
          name: 'height',
          type: 'number',
          title: 'Native height?',
          validation: (rule: any) => rule.required(),
        },
      ],
    },
  ],
  preview: {
    // select: {
    //   title: 'image.alt',
    //   imageUrl: 'image.asset.url',
    // },
  },
}
