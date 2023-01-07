import React, { useEffect } from "react";
import { Typography } from "@mui/material";

import styles from "./styles.module.css";
import StyledLink from "../../components/StyledLink";

const SponsoredLinks = () => {
  useEffect(() => {
    document.title = "About Sponsored Links - Let's Plan!";
  }, []);
  return (
    <div className={styles.sponContainer}>
      <Typography variant="h3" className={styles.sponHeader}>
        About Sponsored Links
      </Typography>
      <p>
        <em>Let's Plan</em> is designed to keep you and your data completely
        private. Websites cost money to run, but disturbing your privacy is not
        an option.
      </p>
      <p>
        In order to maintain the website, a small number of relevant,
        hand-picked links are placed throughout the service. The links are
        provided by a "middleman" between <em>Let's Plan</em> and the product,
        and if you end up making a purchase we get a small cut, without any
        detriment to you.
      </p>
      <p>
        These links take up minimal space, can easily be hidden, and are
        designed to actually be useful for your planning experience. They are
        not personalised to you, so they aren't based on data about you.
      </p>
      <p>
        Just to make it clear -{" "}
        <strong>
          These links are the same for everyone, and does not mean your personal
          information will be tracked or sold in any way.
        </strong>{" "}
        They are much more secure and private than graphic adverts.
      </p>
      <p>
        Please see the{" "}
        <StyledLink to="/legal#tracked-links">privacy policy</StyledLink> (under
        "external paid links") for more information on how they work and the
        middlemen who operate the links themsevles.
      </p>
    </div>
  );
};

export default SponsoredLinks;
