export default {
  name: 'blockImage',
  type: 'object',
  title: 'Image Block',
  fields: [
    {
      name: 'imageRef',
      type: 'image',
      title: 'Image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
          description: 'Description of image for accessibility',
          validation: (rule: any) => rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'image.alt',
      imageUrl: 'image.asset.url',
    },
  },
}
