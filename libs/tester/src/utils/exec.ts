import * as child_process from 'child_process';
import * as util from 'util';

export const exec = util.promisify(child_process.exec);
