import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export default defineType({
  name: 'changelog',
  title: 'Changelog',
  icon: ClockIcon,
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'release',
      title: 'Release Info',
    },
  ],
  fields: [
    defineField({
      name: 'app',
      title: 'App Name',
      type: 'string',
      group: 'content',
      validation: (rule) =>
        rule.required().max(100).warning("The app name shouldn't be longer than 100 characters"),
    }),
    defineField({
      name: 'version',
      title: 'Version Number',
      type: 'string',
      description: 'e.g., v1.2.0, 2024.1, etc.',
      group: 'release',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used in site url',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const app = doc.app || '';
          const version = doc.version || '';
          return `${app} ${version}`.trim().toLowerCase().replace(/\s+/g, '-');
        },
        maxLength: 96,
      },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: {
        list: [
          {title: 'Major Release', value: 'major'},
          {title: 'Minor Release', value: 'minor'},
          {title: 'Patch', value: 'patch'},
          {title: 'Hotfix', value: 'hotfix'},
          {title: 'Beta', value: 'beta'},
          {title: 'Security Update', value: 'security'},
        ],
      },
      group: 'release',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      group: 'release',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'blockImage',
      group: 'content',
      description: 'Optional image for the changelog entry',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
      group: 'content',
      description: 'Brief summary of the changes for listings',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'changes',
      title: 'Detailed Changes',
      type: 'blockContent',
      group: 'content',
      description: 'Detailed breakdown of all changes, improvements, and fixes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'breakingChanges',
      title: 'Breaking Changes',
      type: 'blockContent',
      group: 'content',
      description: 'Important breaking changes that users need to be aware of',
    }),
    defineField({
      name: 'migrationNotes',
      title: 'Migration Notes',
      type: 'blockContent',
      group: 'content',
      description: 'Instructions for users to migrate to this version',
    }),
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [
        {field: 'releaseDate', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [
        {field: 'releaseDate', direction: 'asc'},
        {field: '_createdAt', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      app: 'app',
      version: 'version',
      releaseType: 'releaseType',
      releaseDate: 'releaseDate',
      media: 'featuredImage.imageRef',
    },
    prepare(selection) {
      const {app, version, releaseType, releaseDate} = selection
      return {
        title: `${app} ${version}`,
        subtitle: `${releaseType} • ${releaseDate}`
      }
    },
  },
}) 