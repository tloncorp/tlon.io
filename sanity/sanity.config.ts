import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

import globals from '../website/src/utils/globals'

export default defineConfig({
  name: 'default',
  title: globals.siteURL,

  projectId: globals.sanityProjectId,
  dataset: globals.sanityDataset,

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
