  module.exports = (req, res) => {
  const NEWLINE   = '\n';
  const debug     = !!req.query.debug;
  const separator = req.query.sep ? new RegExp(req.query.sep.trim()) : NEWLINE;

  if (debug) {
    console.debug('Debug is enabled');
    console.debug('Selected separator:', separator);
    console.debug('Body received:', req.body);
  }

  let lines;
  if (req.body)
    lines = Object.keys(req.body)[0].split(NEWLINE);
  else {
    res.status(400).send('No body found\n');
    return;
  }

  if (debug)
    console.debug('Raw lines:', lines);

  let splittedLines = [];
  lines.forEach(line => {
    if (debug)
      console.debug('Processing line:', line);

    if (line.trim() !== '') {
      const addLines = line.trim().split(separator).map(l => l.trim());

      if (debug)
        console.debug('Adding lines: ', addLines);

      splittedLines = splittedLines.concat(addLines);
    }
  })

  if (debug)
    console.debug('Splitted lines:', splittedLines);

  res.status(200).send(splittedLines.join('\n')+'\n')
}
