import { useAtomValue } from 'jotai';
import { Fragment } from 'react';

import { GithubIcon, LinkedInIcon, MailIcon } from '@/components/atoms/icons';
import { ViewerData, viewerDataAtom } from '@/store/viewer-data';

const contacts = (viewerData: ViewerData | null) => [
  {
    type: 'link',
    content: 'Linkedin',
    icon: LinkedInIcon,
    value: 'https://linkedin.com/in/teroln',
  },
  {
    type: 'link',
    content: 'Github',
    icon: GithubIcon,
    value: viewerData?.url ?? '',
  },
  {
    type: 'mail',
    content: 'mail',
    icon: MailIcon,
    value: 'terolnicolas@gmail.com',
  },
];

export function ContactGrid() {
  const viewerData = useAtomValue(viewerDataAtom);
  return (
    <div className="grid grid-cols-[min-content_auto] gap-4 place-self-center py-4 w-full">
      {contacts(viewerData).map(({ content, icon: Icon, value, type }) => (
        <Fragment key={content}>
          <span className="block">
            <Icon classname="h-6 w-6" />
          </span>
          <a href={`${type === 'mail' ? `mailto:` : ''}${value}`}>{content}</a>
        </Fragment>
      ))}
    </div>
  );
}
