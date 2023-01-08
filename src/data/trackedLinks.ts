import { TrackedLinkAlertProps } from "../components/TrackedLinkAlert";

const trackedLinks: (TrackedLinkAlertProps & { key: string })[] = [
  /**
   * Tiquets
   * Added: 2022-05-06
   * Source: Travelpayouts
   */
  {
    key: "tiquets-20220506",
    description:
      "Book mobile tickets for museums, shows and attractions and skip the lines.",
    linkText: "Tiqets makes culture more accessible.",
    link: "https://tp.media/r?marker=361923&trs=169273&p=2074&u=https%3A%2F%2Ftiqets.com",
  },
  /**
   * KiwiTaxi
   * Added: 2022-05-06
   * Source: Travelpayouts
   */
  {
    key: "kiwitaxi-20220506",
    description: "Book taxi transfers from airports and cities worldwide",
    linkText: "with KiwiTaxi.",
    link: "https://tp.media/click?shmarker=361923&promo_id=3542&source_type=link&type=click&campaign_id=1&trs=169273",
  },
  /**
   * Snaptravel
   * Added: 2022-05-06
   * Source: Travelpayouts
   */
  {
    key: "snaptravel-20220506",
    description: "Don't overpay for hotels in any city.",
    linkText: "30-50% off hotels with Snaptravel's messaging only pricing.",
    link: "https://tp.media/click?shmarker=361923&promo_id=6535&source_type=link&type=click&campaign_id=344&trs=169273",
  },
];

export default trackedLinks;
