import { defineType } from 'sanity'

export default defineType({
  title: 'Separator',
  name: 'separator',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'hr', 
      hidden: true, 
      readOnly: true 
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Separator'
      };
    }
  }
});

