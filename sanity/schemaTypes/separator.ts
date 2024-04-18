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
      initialValue: 'dots', 
      options: {
        list: [
          {title: 'Dots', value: 'dots'},
          {title: 'Character', value: 'character'},
          {title: 'Horizontal rule', value: 'hr'},
          {title: 'Semicircles', value: 'semicircles'},
          {title: 'Metaball', value: 'metaball'},
          {title: 'Line-circles', value: 'linecircles'}
        ],
        layout: 'dropdown'
      }
    }
  ],
  preview: {
    select: {
      style: 'type' 
    },
    prepare({style}) {
      return {
        title: `Separator (${style})` 
      };
    }
  }
});

