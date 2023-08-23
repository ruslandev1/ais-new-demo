import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
  } from '@mantine/core';
import { Link } from 'react-router-dom';
  import { ChevronRight } from 'tabler-icons-react';


  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    },

    profile_image : {
        maxWidth : "100%"
    }
  }));
  

  
  export function UserButton({ image, name, email, icon, imgRef , ...others }) {
    const { classes } = useStyles();

    return (
      <Link to="/profile">
      <UnstyledButton className={classes.user} {...others}>
        <Group>
          <Avatar radius="xl">     
          <a href="#" onClick={(e) => handleClickOpen(e)}>
          <img
            ref={imgRef}
            className={classes.profile_image}
            src="http://www.markweb.in/primehouseware/images/noimage.png"
            alt="..."
          />
        </a>
          </Avatar>
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
  
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
  
          {icon || <ChevronRight size="0.9rem" stroke={1.5} />}
        </Group>
      </UnstyledButton>
      </Link>
    );
  }