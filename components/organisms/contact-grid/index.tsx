import { useAtomValue } from 'jotai';
import { Fragment } from 'react';

import { GithubIcon, LinkedInIcon, MailIcon } from '@/components/atoms/icons';
import { ViewerData, viewerDataAtom } from '@/store/viewer-data';

const contacts = (viewerData: ViewerData | null) => [
  {
    type: 'mail',
    content: 'mail',
    icon: MailIcon,
    value: 'terolnicolas@gmail.com',
  },
  {
    type: 'link',
    content: 'github',
    icon: GithubIcon,
    value: 'https://github.com/nterol',
  },
  {
    type: 'link',
    content: 'linkedin',
    icon: LinkedInIcon,
    value: viewerData?.url ?? '',
  },
];

export function ContactGrid() {
  const viewerData = useAtomValue(viewerDataAtom);
  return (
    <div className="grid grid-cols-3 gap-4 place-self-center py-4 w-fit">
      {contacts(viewerData).map(({ content, icon: Icon, value, type }) => (
        <Fragment key={content}>
          <Icon classname="h-6 w-6" />
          <a className="col-span-2" href={`${type === 'mail' ? `mailto:` : ''}${value}`}>
            {value}
          </a>
        </Fragment>
      ))}
    </div>
  );
}
