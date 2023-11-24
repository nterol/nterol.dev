import { useAtomValue } from 'jotai';

import { GithubIcon, LinkedInIcon } from '@/components/atoms/icons';
import { viewerDataAtom } from '@/store/viewer-data';

import classes from './page-footer.module.css';

export const Footer = () => {
  const viewerData = useAtomValue(viewerDataAtom);
  const yearOfLastPush = viewerData ? new Date(viewerData.repository.pushedAt).getFullYear() : '';
  return (
    <footer className={`${classes.container} grid grid-flow-col justify-between items-center`}>
      <div>
        <p className="text-sm font-bold py-4">
          {yearOfLastPush} - {viewerData?.login ?? ''}
        </p>
      </div>
      <div className="flex gap-3">
        <a className="w-5 aspect-square" href={viewerData?.url}>
          <GithubIcon />
        </a>
        <a className="w-5 aspect-square color-black">
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
};
