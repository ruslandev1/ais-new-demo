import { Navbar, Group, Text, ScrollArea, createStyles, rem ,NavLink} from '@mantine/core';
import {
  Notes,
  CalendarStats,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Lock,
} from "tabler-icons-react" 
import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';
import { Link } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));
export function NavbarNested(props) {
  const mockdata = [
    { label: props.moduleTitle, icon: Gauge , link: "/"},
    {
      label: props.moduleTitle,
      icon: Notes,
      initiallyOpened: true,
      link: "/"
    },
    {
      label: props.moduleTitle,
      icon: CalendarStats,
    },
    { label: 'Analytics', icon: PresentationAnalytics , link: "/"},
    { label: 'Contracts', icon: FileAnalytics },
    { label: 'Settings', icon: Adjustments },
    {
      label: props.moduleTitle,
      icon: Lock,
      links: [
        { label: 'Enable 2FA', link: '/profile' },
        { label: 'Change password', link: '/' },
        { label: 'Recovery codes', link: '/' },
      ],
    },
  ];
  
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  console.log("All", links.map((link) => console.log(link)))
  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar} >
      <Navbar.Section className={classes.header} >
        <Group position="apart">
          <Text fz="lg">AVRORA</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {/* links.map(link) */}
        <div className={classes.linksInner}><Link to={links.link}>{links}</Link></div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}