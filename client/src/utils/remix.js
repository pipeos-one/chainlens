import {createIframeClient} from '@remixproject/plugin';

const remixClient = createIframeClient();

export async function exportToRemix(pclasses) {
  await remixClient.onload();
  console.log('exportToRemix', pclasses)
  pclasses.forEach(pclass => {
    exportPclassToRemix(pclass);
  });
}

export async function exportPclassToRemix(pclass) {
  console.log('sourceByLanguage', pclass.data.sourceByLanguage)
  if (!pclass.data.sourceByLanguage || !pclass.data.sourceByLanguage['0']) return;

  // TODO: fix this to sources
  const sourcesTemp = pclass.data.sourceByLanguage['0'].sourcesTemp;

  Object.keys(sourcesTemp).forEach(name => {
    // let fileName = `browser/${source.relative_path}`;
    let fileName = `browser/${name}`;
    if (!fileName.includes('.sol')) {
      fileName += '.sol';
    }
    remixClient.call(
      'fileManager',
      'setFile',
      fileName,
      sourcesTemp[name],
    );
  });
}
