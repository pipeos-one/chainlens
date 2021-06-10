import {createIframeClient} from '@remixproject/plugin';

const remixClient = createIframeClient();

export async function exportToRemix(pclasses = [], pluginName = 'remix') {
  await remixClient.onload();
  console.log('exportToRemix', pclasses)
  if (!(pclasses instanceof Array)) {
    pclasses = [pclasses];
  }
  pclasses.forEach(pclass => {
    exportPclassToRemix(pclass, pluginName);
  });
}

export async function exportToPlugin(pclasses = [], pluginName) {
  if (!(pclasses instanceof Array)) {
    pclasses = [pclasses];
  }
  try {
    remixClient.call(
      pluginName,
      'loadChainLensWorkspace',
      pclasses,
    );
  } catch (e) {
    console.error('exportToPlugin failed', pluginName, e);
  }
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
