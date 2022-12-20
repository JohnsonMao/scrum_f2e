import React from 'react';
import { ReactComponent as Jira } from '@images/jira.svg';
import { ReactComponent as Confluence } from '@images/confluence.svg';
import LogoLinkStyle from './LogoLink.style';

function LogoLink({ logoName }) {
	const logos = {
		Jira: {
			logo: <Jira />,
			width: '90px',
			url: 'https://www.atlassian.com/software/jira'
		},
		Confluence: {
			logo: <Confluence />,
			width: '200px',
			url: 'https://www.atlassian.com/software/confluence'
		}
	};
	return (
		<LogoLinkStyle
			href={logos[logoName].url}
			width={logos[logoName].width}
			target="_blank"
		>
			{React.cloneElement(logos[logoName].logo)}
		</LogoLinkStyle>
	);
}

export default LogoLink;
