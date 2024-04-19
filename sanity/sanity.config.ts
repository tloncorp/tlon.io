import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'
import {DocumentIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Tlon.io',

  projectId: '4vy6phvk',
  dataset: 'production',

  plugins: [structureTool({
    structure: (S) => {
        return S.list()
          .title("Content")
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Global content")
              .id("globalContent")
              .icon(DocumentIcon)
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("globalContent")
                  .documentId("53c46b24-cf16-438f-9f9c-12537707112a")
              ),
              S.documentTypeListItem('post'),
              S.documentTypeListItem('author'),
              S.documentTypeListItem('page'),
              S.documentTypeListItem('menu'),
          ])
      },
  }), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
