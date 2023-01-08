import React, { useEffect } from "react";
import { Typography, Link as MuiLink } from "@mui/material";

import styles from "./styles.module.css";

const Legal = () => {
  useEffect(() => {
    document.title = "Privacy Policy & Terms - Let's Plan!";
  }, []);
  return (
    <div className={styles.legalContainer}>
      <Typography variant="h3" className={styles.legalHeader} id="privacy">
        Privacy Policy
      </Typography>
      <p>
        <MuiLink href="#terms">
          &#8628; Click to navigate to the Terms and Conditions
        </MuiLink>
      </p>
      <p>
        <em>Let's Plan</em> ("The Service") is designed to use data only when
        absolutely necessary for the functionality it provides. The Service does
        not sell or otherwise exploit user data for monetary gain.
      </p>
      <p>
        This Service does not store any data on your computer (cookies, local
        storage, etc) that is not explicitly for providing functionality. By
        "providing functionality", we mean making the features of this Service
        work.
      </p>
      <p>
        You can optionally create an account to store your data securely on the
        cloud, so you can access your trips on any device that supports the
        Service.
      </p>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--data-collected">
        Data Collected
      </Typography>
      <p>
        By default, trip names, plans, dates and all other information not
        otherwise covered in the section below are stored locally on your
        device, and The Service does not store or monitor this information. This
        data is stored to provide functionality. If you log in to The Service,
        the section{" "}
        <MuiLink href="#privacy--if-you-have-an-account">
          <strong>"If You Create An Account"</strong>
        </MuiLink>{" "}
        applies.
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
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in Europe (europe-west) and is governed by the{" "}
            <MuiLink
              href="https://cloud.google.com/terms/"
              target="_blank"
              rel="noreferrer">
              Google Cloud Platform Terms of Service
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Your IP address:</strong> The hosting platform The Service
            uses stores IP address data for anti-abuse purposes. This data is
            minimised and retained for "a few months."
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://firebase.google.com/terms/data-processing-terms"
              target="_blank"
              rel="noreferrer">
              Firebase Data Processing and Security Terms
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
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
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            and is governed by the{" "}
            <MuiLink
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer">
              Google Privacy Policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Your interactions with hCaptcha:</strong> When you interact
            with hCaptcha (for example, when uploading an image), it captures
            "information like mouse movements, scroll position, keypress events,
            touch events, and gyroscope / accelerometer information as
            applicable." This data is used to protect The Service from
            unauthorised use (including spam) by non-human users. hCaptcha is
            only loaded when required.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://www.imachines.com/about"
              target="_blank"
              rel="noreferrer">
              <strong>Intuition Machines, Inc.</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://www.hcaptcha.com/privacy"
              target="_blank"
              rel="noreferrer">
              hCaptcha Privacy Policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited general data about your visit:</strong> For analysis
            purposes (to help make The Service better for its users), a limited
            set of anonymised data is collected, not including any IP addresses
            or other personal identifiable information. Visitors are not
            "fingerprinted". A list of this information is available{" "}
            <MuiLink
              href="https://docs.simpleanalytics.com/what-we-collect"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            . You can opt-out of this anonymous data analysis by{" "}
            <MuiLink
              href="https://allaboutdnt.com"
              target="_blank"
              rel="noreferrer">
              enabling Do Not Track
            </MuiLink>{" "}
            in your browser.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://simpleanalytics.com/"
              target="_blank"
              rel="noreferrer">
              <strong>Simple Analytics</strong>
            </MuiLink>{" "}
            in the Netherlands and is governed by the{" "}
            <MuiLink
              href="https://docs.simpleanalytics.com/what-we-collect"
              target="_blank"
              rel="noreferrer">
              Privacy Policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Limited access logs related to your visit:</strong> For
            security analysis, the DNS provider of The Service keeps limited
            logs about your visit. This data is collected to protect The Service
            from unauthorised access by non-human users.
            <br />
            This data is controlled and processed by{" "}
            <MuiLink
              href="https://www.cloudflare.com/about-overview/"
              target="_blank"
              rel="noreferrer">
              <strong>Cloudflare, Inc.</strong>
            </MuiLink>{" "}
            in the United States and Europe and is governed by the{" "}
            <MuiLink
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noreferrer">
              Cloudflare Privacy Policy
            </MuiLink>{" "}
            (wherein you apply as an "End User".)
          </p>
        </li>
        <li id="tracked-links">
          <p>
            <strong>
              When you click on external paid links ("tracked links"):
            </strong>{" "}
            The Service occasionally provides links to services that may be
            useful for planning your trip. These services are strictly vetted
            and chosen for their reputation for data protection.
            <br />
            Some of these tracked links are provided by an "affiliate marketing
            network" ("AM"), which provides The Service a commission should you
            decide to buy anything through it.
            <br />
            The Service does not gain access to any personal information through
            this.
            <strong>
              {" "}
              Please read the privacy policies of the AMs which act as the data
              controller, linked below, to understand what data they collect
              when you click on their tracked links.
            </strong>
            <br />
            None of your personal information, including any of your trip
            information, is included. If you don't click on tracked links, no
            information is collected or stored.{" "}
            <strong>
              Tracked links are clearly marked with the text "AD:" preceding it.
            </strong>
            <br />
            Provided by{" "}
            <MuiLink
              href="https://www.awin.com/privacy"
              target="_blank"
              rel="noreferrer">
              <strong>AWIN Ltd</strong> or <strong>AWIN AG</strong>
            </MuiLink>
            , wherein you are an "End User" and The Service is a "Publisher",
            and{" "}
            <MuiLink
              href="https://support.travelpayouts.com/hc/en-us/articles/360004121052-Privacy-Policy"
              target="_blank"
              rel="noreferrer">
              <strong>Go Travel Un Limited</strong>
            </MuiLink>
            .
          </p>
        </li>
      </ul>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--if-you-have-an-account">
        If You Have An Account
      </Typography>
      <p>
        The purpose of creating an account on The Service is to be able to
        access your data on devices other than the device you enter the data on,
        and to share your trip data with others. To operate this functionality,
        we need to process and store your login details, and store your trip
        data. If you create and use an account, the following extra data is
        collected:
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            <strong>
              If you logged in with email + password, your email address,
              password:
            </strong>{" "}
            these details are stored by Firebase Authentication only to enable
            authentication and to ensure only you can access your account. The
            Service has no access to your unencrypted password, and the data is
            stored securely. This information is kept unless you delete your
            account. This information is kept unless you delete your account,
            then after it is removed within 180 days.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://firebase.google.com/terms/data-processing-terms"
              target="_blank"
              rel="noreferrer">
              Firebase Data Processing and Security Terms
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>If you logged in with social media, your username:</strong>{" "}
            these details are stored by Firebase Authentication only to enable
            authentication and to ensure only you can access your account. The
            Service has no access to your account or any other information about
            it. Your username for Google is the account email, for every other
            service it's the username. This information is kept unless you
            delete your account, then after it is removed within 180 days.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://firebase.google.com/terms/data-processing-terms"
              target="_blank"
              rel="noreferrer">
              Firebase Data Processing and Security Terms
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>
              Your IP Address and User Agent (web browser's name):
            </strong>{" "}
            these details are collected by Firebase during the login and signup
            processes and are used to prevent abuse and strengthen security.
            These details are kept for a few weeks.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://firebase.google.com/terms/data-processing-terms"
              target="_blank"
              rel="noreferrer">
              Firebase Data Processing and Security Terms
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            .
          </p>
        </li>
      </ul>
      <p>
        If you store one or more trips on your account, the following extra data
        is collected:
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            <strong>Your trips:</strong> Your trip data (including but not
            limited to: activities, travel, title & description, dates) are
            stored within the Firestore database to enable the cloud
            functionality. Unless you choose to share your trip publicly
            (through the "share trip" feature), only you can see your trips.
            Your trip data is stored securely.
            <br />
            This data is controlled by{" "}
            <MuiLink
              href="https://about.google"
              target="_blank"
              rel="noreferrer">
              <strong>Google LLC</strong>
            </MuiLink>{" "}
            in the United States and is governed by the{" "}
            <MuiLink
              href="https://firebase.google.com/terms/data-processing-terms"
              target="_blank"
              rel="noreferrer">
              Firebase Data Processing and Security Terms
            </MuiLink>
            . More information available{" "}
            <MuiLink
              href="https://firebase.google.com/support/privacy#examples-end-user-data-processed-by-firebase"
              target="_blank"
              rel="noreferrer">
              here
            </MuiLink>
            .
          </p>
        </li>
      </ul>
      <Typography
        variant="h4"
        className={styles.legalSubheader}
        id="privacy--access-and-deletion">
        Access And Deletion
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
        To view your offline trip data, please consult{" "}
        <MuiLink
          href="https://developer.chrome.com/docs/devtools/storage/indexeddb/#delete"
          target="_blank"
          rel="noreferrer">
          this guide
        </MuiLink>{" "}
        on how to manually access and delete your local storage.
      </p>
      <p>
        You can download all of the data associated with your account by
        clicking the account button on the top bar, and select "Manage Data". If
        you can't log in, please reach out using the{" "}
        <MuiLink href="#contact">contact details below</MuiLink>.
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            To request the data Google, LLC holds on you, please{" "}
            <MuiLink
              href="https://support.google.com/accounts/answer/3024190"
              target="_blank"
              rel="noreferrer">
              consult this article
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            To request the data Intuition Machines, Inc. holds on you, please
            contact them using the email in the "Notice to EU Data Subjects"
            section in their{" "}
            <MuiLink
              href="https://www.hcaptcha.com/privacy"
              target="_blank"
              rel="noreferrer">
              privacy policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            To request the data Simple Analytics holds on you, please contact
            them{" "}
            <MuiLink href="https://simpleanalytics.com/contact">here</MuiLink>.
          </p>
        </li>
        <li>
          <p>
            To request the data Cloudflare, Inc. holds on you, please contact
            them using the email in section 8 of their{" "}
            <MuiLink
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noreferrer">
              privacy policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            To request the data AWIN Ltd and/or AWIN AG holds on you, please
            contact them using the email under the "Questions?" section of their{" "}
            <MuiLink
              href="https://www.awin.com/gb/privacy"
              target="_blank"
              rel="noreferrer">
              fair processing notice and privacy policy
            </MuiLink>
            .
          </p>
        </li>
        <li>
          <p>
            To request the data Go Travel Un Limited holds on you, please
            contact them using the email under the "Identity of The Data
            Controller" section of their{" "}
            <MuiLink
              href="https://support.travelpayouts.com/hc/en-us/articles/360004121052-Privacy-Policy"
              target="_blank"
              rel="noreferrer">
              privacy policy
            </MuiLink>
            .
          </p>
        </li>
      </ul>
      <Typography variant="h3" className={styles.legalHeader} id="terms">
        Terms and Conditions
      </Typography>
      <p>
        <MuiLink href="#privacy">
          &#8628; Click to navigate to the Privacy Policy
        </MuiLink>
      </p>
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
            data you provide The Service strictly as outlined in the Privacy
            Policy.
          </p>
        </li>
        <li>
          <p>
            <strong>Your use of The Service is at your own risk.</strong> The
            Service makes no guarantee of uptime, stability, that it is free of
            bugs and glitches and it's provided "as is" without warranty.
          </p>
        </li>
      </ul>
      <Typography variant="h3" className={styles.legalHeader} id="contact">
        Contact
      </Typography>
      <p>
        To discuss any concerns, questions, or to exercise your data rights,
        please contact the appointed data representative, Dylan Myers, by email:{" "}
        <code>lets-plan [ at ] dylmye [.] me</code>
      </p>
      <Typography variant="h3" className={styles.legalHeader} id="revisions">
        Revisions
      </Typography>
      <p>
        This is the first version of these legal documents. It was modified{" "}
        <time dateTime="2022-12-17">17th December, 2022</time>.
      </p>
      <ul className={styles.legalList}>
        <li>
          <p>
            <strong>
              <time dateTime="2022-12-17">17th December, 2022</time>
            </strong>{" "}
            - Initial version
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Legal;
