import React from "react";
import { Typography } from "@mui/material";

import styles from "./Legal.module.css";

const Legal = () => {
  return (
    <div className={styles.legalContainer}>
      <Typography variant="h3" className={styles.legalHeader} id="privacy">
        Privacy Policy
      </Typography>
      <p>
        This website is designed to collect minimal amounts of data, both for
        your privacy and because I don't need it.
      </p>
      <p>This website does not store any cookies on your computer.</p>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--data-collected"
      >
        Data Collected
      </Typography>
      <p>
        Trip names, plans, dates and all other information not otherwise covered
        in this document are stored locally on your device, and this website
        does not store or monitor this information.
      </p>
      <p>
        The following information is stored somewhere outside of your device
        when you provide it:
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            <strong>Trip images:</strong> Images you upload for your trips are
            stored securely. Image metadata (EXIF data) is not kept. The purpose
            of keeping this data is to provide functionality. When your trip is
            deleted, related imagery is also deleted. Your IP address may be
            retained for anti-abuse purposes.
            <br />
            This data is controlled by
            <strong> Google LLC</strong> in Europe (europe-west) and is governed
            by the{" "}
            <a href="https://cloud.google.com/terms/">
              Google Cloud Platform Terms of Service
            </a>
            . More information available{" "}
            <a href="https://firebase.google.com/support/privacy#examples_of_end-user_personal_data_processed_by_firebase">
              here
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Your IP address:</strong> The hosting platform this website
            uses stores IP address data for anti-abuse purposes. This data is
            minimised and retained for "a few months."
            <br />
            This data is controlled by <strong> Google LLC</strong> in the
            United States and is governed by the{" "}
            <a href="https://firebase.google.com/terms/data-processing-terms">
              Firebase Data Processing and Security Terms
            </a>
            . More information available{" "}
            <a href="https://firebase.google.com/support/privacy#examples_of_end-user_personal_data_processed_by_firebase">
              here
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Your location search results:</strong> The "autocomplete"
            API used in the trip creation process stores an anonymous history of
            search results to allow Google to improve its services.
            <br />
            This data is controlled by <strong> Google LLC</strong> and is
            governed by the{" "}
            <a href="https://policies.google.com/privacy">
              Google Privacy Policy
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Your interactions with hCaptcha:</strong> When you interact
            with hCaptcha (for example, when uploading an image), it captures
            "information like mouse movements, scroll position, keypress events,
            touch events, and gyroscope / accelerometer information as
            applicable." This data is used to protect the website from
            unauthorised use (including spam) by non-human users. hCaptcha is
            only loaded when required.
            <br />
            This data is controlled by{" "}
            <strong> Intuition Machines, Inc.</strong> in the United States and
            is governed by the{" "}
            <a href="https://www.hcaptcha.com/privacy">
              hCaptcha Privacy Policy
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited general data about your visit:</strong> For analysis
            purposes (to help make this website better, and to understand the
            behaviour of users), a limited set of anonymised data is collected,
            not including any IP addresses or other personal identifiable
            information. A list of this information is available{" "}
            <a href="https://docs.simpleanalytics.com/data-points">here</a>. If
            you have Do Not Track enabled, this information is not collected.
            <br />
            This data is controlled by <strong>Simple Analytics</strong> in the
            Netherlands and is governed by the{" "}
            <a href="https://docs.simpleanalytics.com/what-we-collect">
              Privacy Policy
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited access logs related to your visit:</strong> For
            security analysis, limited logs are kept about your visit to this
            website. This data is collected to protect this website from
            unauthorised access by non-human users.
            <br />
            This data is controlled and processed by{" "}
            <strong>Cloudflare, Inc.</strong> in the United States and Europe
            and is governed by the{" "}
            <a href="https://www.cloudflare.com/privacypolicy/">
              Cloudflare Privacy Policy
            </a>{" "}
            (wherein you apply as an "End User".)
          </p>
        </li>
      </ul>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--access-and-deletion"
      >
        Access and deletion
      </Typography>
      <p>
        Deleting a trip through the web interface will delete all related data
        permanently - there is no backup kept remotely.
      </p>
      <p>
        All trip images are deleted 12 months after they are uploaded. It's not
        possible to delete a trip image if you've cleared your local storage
        because images are not tied to your identity. (That being said, Google
        stores the IP address of the uploader for anti-abuse purposes, as
        outlined above.)
      </p>
      <p>
        To view your trip data, please consult{" "}
        <a href="https://developer.chrome.com/docs/devtools/storage/localstorage/">
          this guide
        </a>{" "}
        on how to access your local storage.
      </p>
      <Typography variant="h3" className={styles.legalHeader} id="terms">
        Terms and Conditions
      </Typography>
      <ul className={styles.legalList}>
        <li>
          <p>
            You may not use this service to attack or disparage others, to host
            adult or otherwise inappropriate content.
          </p>
        </li>
        <li>
          <p>
            You agree that you retain all rights to the text and images you
            upload to this service. You agree that you will only upload content
            you have the relevant rights to.
          </p>
        </li>
        <li>
          <p>
            You give permission for this service and its partners to process the
            data you provide this website strictly as outlined in the Privacy
            Policy.
          </p>
        </li>
        <li>
          <p>
            <strong>Your use of this website is at your own risk.</strong> This
            website makes no guarantee of uptime, stability, that it is free of
            bugs and glitches and it's provided "as is" without warranty.
          </p>
        </li>
      </ul>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--revisions"
      >
        Revisions
      </Typography>
      <p>
        This is the first version of these legal documents. It was modified{" "}
        <time dateTime="2022-02-17">17th Feb 2022</time>. This section will
        detail any changes made in the future.
      </p>
    </div>
  );
};

export default Legal;
