import React from "react";
import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import "./DCard.css";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    transition: "0.3s",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "0%",
      content: '""',
      display: "block",
      backgroundColor: "#d9daf1",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-12px 12px 64px 0 #bcc3d6",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    top: "100px",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.4s",
    height: "100%",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  joined = false,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2}>
          <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} />
          <Info position={"middle"} useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
        <Row p={2} gap={2} position={"bottom"}>
          <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {new Array(5).fill(0).map((_, index) => (
                <Avatar
                  key={index}
                  src={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
                />
              ))}
            </AvatarGroup>
          </Item>
          <Item position={"middle-right"}>
            <Button
              className={styles.join}
              classes={btnStyles}
              variant={"contained"}
              color={"primary"}
              disableRipple
              onClick={""}
            >
              {joined ? "Leave DAO" : "Join DAO"}
            </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export const DCard = React.memo(function DCard() {
  return (
    <>
      <div className="dcard__header">NFT</div>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130"
            }
            title={"CryptoPunks"}
            subtitle={"Created by ddd009"}
            description={
              <>
                <b>ddd009</b> and 3 others are already members group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            joined
            thumbnail={
              "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s130"
            }
            title={"Doodles"}
            subtitle={"Created by ddd009"}
            description={"You are already a member of this group "}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130"
            }
            title={"Bored Ape"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>RainBOW</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://e3izy-jiaaa-aaaah-qacbq-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=kqh5u-aqkor-uwiaa-aaaaa-b4aaq-maqca-aacul-a"
            }
            title={"Cronic"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>RainBOW</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://lh3.googleusercontent.com/6CS0frnjPEpvJ8hE3OG6_TbJFEC5YYThnZMdLTTmW-Z91lyYAJkPA7-ou2uE-b_J-cBUBeqWkI4HYKHEiu2PAyCT6wkYKzoeCyuy=s130"
            }
            title={"MekaVerse"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>ddd009</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://nbg4r-saaaa-aaaah-qap7a-cai.raw.ic0.app/?cc=0&type=thumbnail&tokenid=5ihzm-gykor-uwiaa-aaaaa-b4ad7-yaqca-aabij-q"
            }
            title={"Starverse"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>killer</b> and 10 others are already members of this group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://lh3.googleusercontent.com/3_gd4Qw8gDdgFpzJWK9x2kYkbZMlihGNfCBqazHUnhcODsFd05gfH4LEc22eFjVNNZJtahj1zabFYMTESjNyKgEEbj4rQni2xUv0=s130"
            }
            title={"Loot"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>RainBOW</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://lh3.googleusercontent.com/C272ZRW1RGGef9vKMePFSCeKc1Lw6U40wl9ofNVxzUxFdj84hH9xJRQNf-7wgs7W8qw8RWe-1ybKp-VKuU5D-tg=s130"
            }
            title={"CryptoKitties"}
            subtitle={"Created by ddd009"}
            description={
              <>
                <b>ddd009</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid>
      </Grid>
    </>
  );
});
export default DCard;
