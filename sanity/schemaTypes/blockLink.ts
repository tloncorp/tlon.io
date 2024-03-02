import {LinkIcon} from '@sanity/icons'

export default {
  name: 'linkBlock',
  type: 'object',
  icon: LinkIcon,
  title: 'Link Block',
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Text',
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
    },
    {
      title: 'Open in a new window?',
      name: 'blank',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Display as button?',
      name: 'displayButton',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    // https://www.sanity.io/docs/previews-list-views
    select: {
      title: 'text',
      subtitle: 'url',
    },
  },
}
