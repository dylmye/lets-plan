import React from "react";
import { Typography } from "@mui/material";

import styles from "./styles.module.css";

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
            This data is controlled by <strong>Dylan Myers</strong> acting as{" "}
            <em>Let's Plan</em> and processed by{" "}
            <a href="https://about.google" target="_blank" rel="noreferrer">
              <strong>Google LLC</strong>
            </a>{" "}
            in Europe (europe-west) and is governed by the{" "}
            <a href="https://cloud.google.com/terms/" target="_blank" rel="noreferrer">
              Google Cloud Platform Terms of Service
            </a>
            . More information available{" "}
            <a href="https://firebase.google.com/support/privacy#examples_of_end-user_personal_data_processed_by_firebase" target="_blank" rel="noreferrer">
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
            This data is controlled by{" "}
            <a href="https://about.google" target="_blank" rel="noreferrer">
              <strong>Google LLC</strong>
            </a>{" "}
            in the United States and is governed by the{" "}
            <a href="https://firebase.google.com/terms/data-processing-terms" target="_blank" rel="noreferrer">
              Firebase Data Processing and Security Terms
            </a>
            . More information available{" "}
            <a href="https://firebase.google.com/support/privacy#examples_of_end-user_personal_data_processed_by_firebase" target="_blank" rel="noreferrer">
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
            This data is controlled by{" "}
            <a href="https://about.google" target="_blank" rel="noreferrer">
              <strong>Google LLC</strong>
            </a>{" "}
            and is governed by the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
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
            <a href="https://www.imachines.com/about" target="_blank" rel="noreferrer">
              <strong>Intuition Machines, Inc.</strong>
            </a>{" "}
            in the United States and is governed by the{" "}
            <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noreferrer">
              hCaptcha Privacy Policy
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited general data about your visit:</strong> For analysis
            purposes (to help make this website better for its users), a limited
            set of anonymised data is collected, not including any IP addresses
            or other personal identifiable information. A list of this
            information is available{" "}
            <a href="https://docs.simpleanalytics.com/data-points" target="_blank" rel="noreferrer">here</a>. You
            can opt-out of this anonymous data analysis by{" "}
            <a href="https://allaboutdnt.com" target="_blank" rel="noreferrer">enabling Do Not Track</a> in your
            browser.
            <br />
            This data is controlled by{" "}
            <a href="https://simpleanalytics.com/" target="_blank" rel="noreferrer">
              <strong>Simple Analytics</strong>
            </a>{" "}
            in the Netherlands and is governed by the{" "}
            <a href="https://docs.simpleanalytics.com/what-we-collect" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited access logs related to your visit:</strong> For
            security analysis, the DNS provider of this website keeps limited
            logs about your visit. This data is collected to protect this
            website from unauthorised access by non-human users.
            <br />
            This data is controlled and processed by{" "}
            <a href="https://www.cloudflare.com/about-overview/" target="_blank" rel="noreferrer">
              <strong>Cloudflare, Inc.</strong>
            </a>{" "}
            in the United States and Europe and is governed by the{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
              Cloudflare Privacy Policy
            </a>{" "}
            (wherein you apply as an "End User".)
          </p>
        </li>
        <li id="tracked-links">
          <p>
            <strong>When you click on external paid links:</strong> The website
            occasionally provides links to services that may be useful for
            planning your trip. These services are strictly vetted and chosen
            for their reputation for data protection.
            <br />
            Some of these external links ("tracked links") are provided by an
            "affiliate marketing network" ("AM"), which provides this website a
            commission should you decide to buy anything through it. Please read
            the privacy policies of the AMs which act as the data controller,
            linked below, to understand what data they collect when you click on
            their tracked links.
            <br />
            None of your personal information, including any of your trip
            information, is included. If you don't click on tracked links, no
            information is collected or stored.{" "}
            <strong>
              Tracked links are marked with the text "AD:" preceding it.
            </strong>
            <br />
            Provided by{" "}
            <a href="https://www.awin.com/privacy" target="_blank" rel="noreferrer">
              <strong>AWIN Ltd</strong> or <strong>AWIN AG</strong>
            </a>
            , wherein you are an "End User" and this website is a "Publisher",
            and{" "}
            <a href="https://support.travelpayouts.com/hc/en-us/articles/360004121052-Privacy-Policy" target="_blank" rel="noreferrer">
              <strong>Go Travel Un Limited</strong>
            </a>
            .
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
        All trip images are deleted 12 months after they are uploaded, or when
        the trip is deleted, whichever is earliest. It's not possible to delete
        a trip image if you've cleared your local storage because images are not
        tied to your identity.
      </p>
      <p>
        To view your trip data, please consult{" "}
        <a href="https://developer.chrome.com/docs/devtools/storage/localstorage/" target="_blank" rel="noreferrer">
          this guide
        </a>{" "}
        on how to manually access and delete your local storage.
      </p>
      <p>
        To request the data Google, LLC holds on you, please{" "}
        <a href="https://support.google.com/accounts/answer/3024190?hl=en" target="_blank" rel="noreferrer">
          consult this article
        </a>
        .
      </p>
      <p>
        To request the data Intuition Machines, Inc. holds on you, please
        contact them using the email in the "Notice to EU Data Subjects" section
        in their <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noreferrer">privacy policy</a>.
      </p>
      <p>
        To request the data Simple Analytics holds on you, please contact them{" "}
        <a href="https://simpleanalytics.com/contact">here</a>.
      </p>
      <p>
        To request the data Cloudflare, Inc. holds on you, please contact them
        using the email in section 8 of their{" "}
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">privacy policy</a>.
      </p>
      <p>
        To request the data AWIN Ltd and/or AWIN AG holds on you, please contact
        them using the email under the "Questions?" section of their{" "}
        <a href="https://www.awin.com/gb/privacy" target="_blank" rel="noreferrer">fair processing notice and privacy policy</a>.
      </p>
      <p>
        To request the data Go Travel Un Limited holds on you, please contact
        them using the email under the "Identity of The Data Controller" section
        of their{" "}
        <a href="https://support.travelpayouts.com/hc/en-us/articles/360004121052-Privacy-Policy" target="_blank" rel="noreferrer">
          privacy policy
        </a>
        .
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
        This is the second version of these legal documents. It was modified{" "}
        <time dateTime="2022-05-05">5th May 2022</time>.
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            <strong>
              <time dateTime="2022-05-05">5th May 2022</time>
            </strong>{" "}
            - Added information about tracked links
          </p>
        </li>
        <li>
          <p>
            <strong>
              <time dateTime="2022-04-13">13th April 2022</time>
            </strong>{" "}
            - Clarified processor/controller of trip images, some clarification
            of essential purposes, links to data processors/controllers
          </p>
        </li>
        <li>
          <p>
            <strong>
              <time dateTime="2022-02-17">17th Feb 2022</time>
            </strong>{" "}
            - Initial version
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Legal;
