export const sections = [
  {
    title: "Payment Method",
    contents: [
      "The available international credit card options are VISA, Mastercard, Maestro, American Express, Discover and Diners. The available domestic debit card options are VISA and Mastercard.",
      "Please note that Hema does not collect your credit/debit card number or personal information when you make a payment. For questions regarding your transactions on our site, please consult your card-issuing bank for information.",
      "Please make sure that you enter the coupon code exactly as you received it, with no space before, within, or after it. To avoid errors, we recommend you to copy/paste the promotional code you received.",
    ],
    list: {
      type: "ul",
      items: [
        "Coupons cannot be combined. You can only use one coupon code per order.",
        "Coupons are subject to offer terms. This does exclude some items on our website which are not eligible for coupon discounts.",
        "You can pay up to 70% of your purchase with bonus points at checkout. Remember that 100 points = $1.",
      ],
    },
  },
  {
    title: "Shipping Information",
    contents: [
      "We have put a lot of focus on making sure the items get delivered to our customers as quickly as possible. You will receive your order in 6-17 business days from the date that it is placed.",
      "A confirmation email will be sent to you once the order is authorized and verified. We begin preparing your order immediately after it is verified. With this sort of time frame, it makes it difficult for us to change or cancel your order, however, we will do our best to support your request.",
      "It normally takes 3-7 business days for us to process your order. Please note that this does not include holidays and weekends.",
    ],
  },
  {
    title: "To track your order",
    customList: [
      {
        text: (
          <>
            Click{" "}
            <a href="#" className="text-primary fw-bold">
              here
            </a>{" "}
            and login to your account.
          </>
        ),
      },
      {
        text: (
          <>
            Once you're logged in, choose{" "}
            <a href="#" className="text-primary fw-bold">
              "Order History"
            </a>
          </>
        ),
      },
      {
        text: (
          <>
            Click{" "}
            <a href="#" className="text-primary fw-bold">
              "Track Package"
            </a>{" "}
            to retrieve your tracking information.
          </>
        ),
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    contents: [
      "It's bummed to us if you're not 100% satisfied with the items you received, we gladly accept returns postmarked within 45 days from the purchase date and we have made the returns so easy for you!",
    ],
    list: {
      type: "ol",
      items: [
        "Sign into your account.",
        "Find the order in My Orders, click the “Return Item” button.",
        "Select the item(s) you would like to return, indicate the reasons, and submit.",
        "Select the mailing method: self-sending or pick-up service (choose the pick-up address and post office required information).",
        "The logistics company will contact you as soon as possible, please wait for the courier to pick up the package or take the sealed package to the nearby mailing point and send to the address of Hema return center.",
        "We will confirm the parcel immediately after we receive the return, update the status of the return and refund within 7 working days. The refund will be returned to your Hema wallet or to your original payment account.",
      ],
    },
  },
  {
    title: "Return Conditions",
    contents: [
      "We only accept returns postmarked within 45 days from the purchase date. Orders must be delivered. The address of the recipient must be in India. The following items cannot be returned or exchanged: bodysuits, lingerie & sleepwear, swimwear, jewelry, and accessories (except scarves, bags, and mermaid blankets).",
      "All items in bundling promotion are not eligible for partial cancels, exchanges, or returns. Items returned must be in their unused condition with the original packing. We do not accept a returned item that’s worn, damaged, washed or altered in any way. We do not accept returned items that were sent back by you directly without checking with us first. We do not offer Freight To Collect (FTC) service for the packages returned to us. The returns will be made at your own cost.",
    ],
  },
  {
    title: "Refunds",
    contents: [
      "Returns will be processed within 7 days upon receipt of your package. The refund will be issued to your Hema Wallet or the original payment account per your request. If the order is free shipping, postage will not be deducted.",
      "Pick-up service charge will be deducted from total refund and self-sending shipping fee will be at your own cost.",
      <>
        <strong>Note：</strong> Refunds will be initiated for items only, other
        fees like insurance, shipping, COD service charges are non refundable.
      </>,
    ],
  },
];
