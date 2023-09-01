import React, { useRef, useState} from "react";
import { Avatar as AvatarMantine, Text, Button, Paper, createStyles, Anchor } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";

import {
  avrFetch,
  readResponseAsBlob,
  readResponseAsJSON,
  validateResponse,
} from "../../utils/AvroraFetch";

import { BACKEND_URL } from "../../utils/Constants";
import { useSpring ,animated} from "@react-spring/web";
import useBoop from "../../hooks/useBoop";

const PREFIX = 'Home';

function Home() {

  const imgRef = useRef(null);
  const ref = useRef()

  const [isHovered, setHovered] = useState(false)

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [0, 0, 1],
      // Setup physics
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
    };
  });

  const fetchProfileImg = async () => {
    const response = await avrFetch(`${BACKEND_URL}/api/User/img/`, {
      cache: "default",
    });
    const image = await response.blob()
    const file = new Blob([image], { type: "image/jpeg" });
    let fileUrl = (window.URL || window.webkitURL).createObjectURL(file)
    imgRef.current.src = fileUrl;
  };

  const fetchUserInfo = async () => {
    const response = await avrFetch(`${BACKEND_URL}/api/User/Get/`);
    const data = await response.json();
    console.log("DATA-QUERY", data)
    return data;
  };



  const profileImgQuery = useQuery({
    queryKey: ["profileImg"],
    queryFn: fetchProfileImg
  })

  const userInfoQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo
  })


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

    profile_image: {
      maxWidth: "100%"
    }
  }));


  const { classes } = useStyles()

	const [style,trigger] = useBoop({x : 2, y: 2})

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <AvatarMantine size={110} radius={120} mx="auto">
        <animated.img
          className={classes.profile_image}
          ref={imgRef}
          src="https://img.freepik.com/free-vector/letter-r-logo-concept-with-golden-florals_1017-29506.jpg"
          alt="Profile image"
          withplaceholder
          placeholder={<Text align="center">Profile Image</Text>}
					style={style}
					onMouseEnter={trigger}
        />
      </AvatarMantine>
      <Text ta="center" fz="lg" weight={500} mt="md">
        {userInfoQuery?.data?.data.firstName} • {userInfoQuery?.data?.data.lastName}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {userInfoQuery?.data?.data.username}
      </Text>

      <Button fullWidth mt="lg">
        <Anchor sx={{ color: "#ffff" }}>
          Çox istifadə edilən keçidlər üçün buraya klik edin
        </Anchor>
      </Button>
    </Paper>
  );
}



export default Home;
