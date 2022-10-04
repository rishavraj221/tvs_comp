import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

import useWindowDimensions from "../hooks/useWindowDimensions";
import { scanAllPdfs } from "../api/prod";
import styles from "../styles/Home.module.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const templates_data = [
  {
    temp_name: "Sanction Letter",
    data: "<p>Date : ....................</p><p><br></p><p>To,</p><p>...............................</p><p><br></p><p>Dear Sir / Madam, </p><p><br></p><p>Your application for personal loan - Sanction letter</p><p><br></p><p>We are pleased to inform that we have sanctioned a personal loan of ........................... in your favour for .................................... on the under noted terms &amp; conditions.</p><p><br></p><p>Sanctioned Amount ..............................</p><p>Date ..........................</p><p><br></p><p>Terms and Conditions -</p><p>The above sanction is, however subject to:</p><ol><li>Execution of Loan documents as per Banks format and guidelines</li><li>The ROI / EMI is subject to change from time to time</li><li>The above sanction shall be valid for a period of six months from the date of issue of the sanction letter</li></ol><p><br></p><p>Please convey acceptance for having accepted the terms and conditions of the sanction.</p><p><br></p><p>Thank You</p><p>Yours truly</p><p>For TVS Credit</p><p>............................</p><p>Authorised Signatory</p><p><br></p><p><br></p><p><br></p>",
  },
  {
    temp_name: "Personal Loan",
    data: "<p>Date : ....................</p><p><br></p><p>To,</p><p>...............................</p><p><br></p><p>Dear Sir / Madam, </p><p><br></p><p>Welcome to TVS Credit and thank you for choosing us for your personal loan.</p><p><br></p><p>We are pleased to inform you that your loan for ........................ has been disbursed and your personal loan account number is ...................................</p><p><br></p><p>As you aware, we will present the instalment cheque on the ........................ Please ensure that your bank account is adequately funded. This will avoid levy of additional charges for non receipt of payment. </p><p><br></p><p>Your instalment amount is ............................ and the repayment will start from ............................</p><p><br></p><p>If you require any further detail on your personal loan account, please contact us at any of the telephone numbers given below. Our customer representative will be glad to assist you.</p><p><br></p><p>We value your relationship with us and assure you of our best services always.</p><p><br></p><p>Best Regards</p><p>Yours truly</p><p>TVS Credit</p><p><br></p><p>This is a computer generated letter hence does not require any signature.</p><p><br></p><p><br></p><p><br></p>",
  },
  {
    temp_name: "Loan Agreement",
    data: `<p><br></p><p>I.	THE PARTIES. This Loan Agreement (“Agreement”) made this [DATE] is between:</p><p><br></p><p>Borrower: [BORROWER'S NAME] with a mailing address of [ADDRESS] (“Borrower”) and agrees to borrow money from:</p><p><br></p><p>Lender: [LENDER'S NAME] with a mailing address of [ADDRESS] and agrees to lend money to the Borrower under the following terms:</p><p><br></p><p>II.	LOAN AMOUNT. The total amount of money being borrowed from the Lender to the Borrower is $[AMOUNT] (“Borrowed Money”).</p><p><br></p><p>III.	INTEREST RATE. The Borrowed Money shall: (check one)</p><p><br></p><p>☐ - Bear Interest. The Borrowed Money shall bear interest at a rate of [#]% compounded: (check one)</p><p>☐ - Annually</p><p>☐ - Monthly</p><p>☐ - Other: [OTHER]</p><p><br></p><p>☐ - NOT Bear Interest. There shall be no interest associated with the Borrowed Money. The Borrower’s only obligation to the Lender is to repay the principal balance.</p><p><br></p><p>IV.	TERM. The total amount of the Borrowed Money, including principal and interest, shall be due and payable on [DATE] (“Due Date”).</p><p><br></p><p>V.	PAYMENTS. The Borrower agrees to repay the Borrowed Money to the Lender under the following payment schedule: (check one)</p><p><br></p><p>☐ - Weekly Payments. The Borrower agrees to repay the Lender a payment of [AMOUNT] on the [DAY] of each week until the Due Date.</p><p><br></p><p>☐ - Monthly Payments. The Borrower agrees to repay the Lender a payment of [AMOUNT] on the [DAY] of each month until the Due Date.</p><p><br></p><p>☐ - Lump Sum. The Borrower agrees to repay the Lender, in full, on the Due Date.</p><p><br></p><p>☐ - Other. [OTHER]</p><p><br></p><p>Hereinafter known as the “Payment Schedule.” All payments made by the Borrower shall be first applied to any accrued interest and second to the principal balance.</p><p><br></p><p>VI.	LATE PAYMENT. If the Borrower is late by more than [#] days for any payment due, it shall be considered late. If a payment is late, the Borrower shall be: (check one)</p><p><br></p><p>☐ - Charged a Late Fee. The Borrower shall be charged a late fee equal to: [LATE FEE AMOUNT]</p><p><br></p><p>☐ - Not Charged a Late Fee. The Borrower shall not be charged a late fee.</p><p><br></p><p>VII.	PREPAYMENT. If the Borrower makes a payment prior to the Due Date, there shall be: (check one)</p><p><br></p><p>☐ - A Prepayment Penalty. If the Borrower makes a payment prior to the Due Date, then there shall be a prepayment penalty of: (check one)</p><p>☐ - Interest payments due as if the prepayments were not made.</p><p>☐ - Other: [OTHER]</p><p><br></p><p>☐ - No Prepayment Penalty. If the Borrower makes a payment prior to the Due Date, then there shall be no prepayment penalty of any kind.</p><p><br></p><p>VIII.	SECURITY. As part of this Agreement, the Borrower agrees to: (check one)</p><p><br></p><p>☐ - Pledge Security. The Borrower agrees to secure this Agreement by pledging the following collateral: [DESCRIBE] (“Security”).&nbsp;</p><p><br></p><p>In the event the Borrower defaults under this Agreement, the Lender shall obtain possession of the Collateral: (check one)</p><p>☐ - In its entirety and without discount to the amount owed.</p><p>☐ - Equal to the amount owed of which a sale may be required.</p><p><br></p><p>☐ - Not Pledge Security. This Agreement shall not be secured by any property or asset of the Borrower.</p><p><br></p><p>IX.	REMEDIES. No delay or omission on part of the holder of this Agreement in exercising any right hereunder shall operate as a waiver of any such right or of any other right of such holder, nor shall any delay, omission, or waiver on any one occasion be deemed a bar to or waiver of the same or any other right on any future occasion. The rights and remedies of the Lender shall be cumulative and may be pursued singly, successively, or together, at the sole discretion of the Lender.</p><p><br></p><p>X.	ACCELERATION. The Lender shall have the right to declare the Borrowed Money to be immediately due and payable, including interest owed, if any of the events are to occur:</p><p><br></p><p>a.	Late Payment. If any payment is late that is due under the Payment Schedule of more than 15 days;</p><p>b.	Default. If the Borrower should default on any of the conditions of this Agreement; or</p><p>c.	Security. If assets or property that are pledged as Security as part of this Agreement are transferred or sold.</p><p><br></p><p>XI.	SUBORDINATION. The Borrower’s obligations under this Agreement are subordinated to all indebtedness, if any, of the Borrower, to any unrelated third-party lender to the extent such indebtedness is outstanding on the date of this Agreement and such subordination is required under the loan documents providing for such indebtedness.</p><p><br></p><p>XII.	WAIVERS BY BORROWER. All parties to this Agreement, including the Borrower and any sureties, endorsers, and guarantors, hereby waive protest, presentment, a notice of dishonor, and a notice of acceleration of maturity and agree to continue to remain bound for the payment of principal, interest and all other sums due under this Agreement notwithstanding any change or changes by way of release, surrender, exchange, modification or substitution of any security for this Agreement or by way of any extension or extensions of time for the payment of principal and interest; and all such parties waive all and every kind of notice of such change or changes and agree that the same may be made without notice or consent of any of them.</p><p><br></p><p>XIII.	DISPUTES. In the event any payment under this Agreement is not paid when due, the Borrower agrees to pay, in addition to the principal and interest hereunder, reasonable attorney’s fees not exceeding a sum equal to the maximum usury rate in the state of Governing Law of the then outstanding balance owing on the Borrowed Amount, plus all other reasonable expenses incurred by Lender in exercising any of its rights and remedies upon default.</p><p><br></p><p>XIV.	SEVERABILITY. If any provision of this Agreement or the application thereof shall, for any reason and to any extent, be invalid or unenforceable, neither the remainder of this Agreement nor the application of the provision to other persons, entities, or circumstances shall be affected, thereby, but instead shall be enforced to the maximum extent permitted by law.</p><p><br></p><p>XV.	GOVERNING LAW. This Agreement shall be construed and governed by the laws located in the state of [GOVERNING LAW] (“Governing Law”).</p><p><br></p><p>XVI.	SUCCESSORS. All of the foregoing is the promise of Borrower and shall bind Borrower and Borrower’s successors, heirs, and assigns; provided, however, that Lender may not assign any of its rights or delegate any of its obligations hereunder without the prior written consent of the holder of this Agreement.</p><p><br></p><p>XVII.	ENTIRE AGREEMENT. This Agreement contains all the terms agreed to by the parties relating to its subject matter, including any attachments or addendums. This Agreement replaces all previous discussions, understandings, and oral agreements. The Borrower and Lender agree to the terms and conditions and shall be bound until the Borrowed Amount is repaid in full.</p><p><br></p><p>IN WITNESS WHEREOF, Borrower and Lender have executed this Agreement as of the day and year first above written.</p><p><br></p><p><br></p><p>Borrower’s Signature: _____________________ Date: _____________</p><p>Print Name: _____________________</p><p><br></p><p><br></p><p>Lender’s Signature: _____________________ Date: _____________</p><p>Print Name: _____________________</p><p><br></p><p>GUARANTOR (IF APPLICABLE)</p><p><br></p><p>The Guarantor, known as [GUARANTOR'S NAME], agrees to be liable and pay the Borrowed Amount, including principal and interest, in the event of the Borrower’s default. The Guarantor agrees to be personally liable under the terms and obligations of the Borrower in this Agreement.</p><p><br></p><p>Guarantor’s Signature: _____________________ Date: _____________</p><p>Print Name: _____________________</p><p><br></p>`,
  },
  {
    temp_name: "No Objection Certificate",
    data: "<p>Date : .............................</p><p><br></p><p>Subject : No Objection Certificate</p><p><br></p><p>It is to certify that .......................... bearing .............................. was maintaining his / her personal finance account no ................................. with ........................... and there is no outstanding liability and the said loan has been fully adjusted with up to date mark up.</p><p><br></p><p>.............................. can do further banking and transactions without any restrictions. This certificate is being issued on the specific request of the above mentioned customer without any risk and responsibility on the part of the bank or any of its employees.</p><p><br></p><p>Warm Regards,</p><p>Name: .............................</p><p>(Designation)</p><p><br></p>",
  },
  {
    temp_name: "Legal Notice",
    data: "<p>Legal Notice</p><p><br></p><p>Ref. No……………. Dated ____, __________</p><p>&nbsp;</p><p>REGD.A.D.</p><p><br></p><p>LEGAL NOTICE</p><p><br></p><p>To,</p><p>____________</p><p><br></p><p>Dear Sir,</p><p><br></p><p>Pursuant to the instructions from and on behalf of my client ___________________, through its _____________, I do hereby serve you with the following Legal Notice: -</p><p><br></p><p>1- That my client is a ___________ firm/individual under the name and style of M/s ______________________.</p><p><br></p><p>2- That my client is engaged in the business of __________ of the ___ etc.</p><p><br></p><p>3- That against your valid and confirmed order my client did your job work from time to time on credit basis as you have running credit account in the account books of my client operated in due course of business.</p><p><br></p><p>4- That my client-raised bills of each and every work performed for payment, although you have acknowledged the receipt of such bills raised by my client.</p><p><br></p><p>5- That in-spite of acknowledging the liability of payment of principal balance of Rs. _________/- you have been miserably failed to make payment of the said amount due to my client from you deliberately with malafide intent, hence you are liable to pay the said principal balance amount of Rs. __________/- along with interest @ __% p.a. from the date of due till actual realisation of the said sum as is generally and customarily prevailing in the trade usages, which comes to Rs. __________/-</p><p><br></p><p>6- That thus you are liable to pay the total amount of Rs. ________/- to my above named client and my above named client is entitled to recover the same from you.</p><p><br></p><p>7- That my client requested you several times through telephonic message and by sending personal messenger to your office for release of the said outstanding payment, but you have always been dilly delaying the same on one pretext or the other and so far have not paid even a single paisa out of the said outstanding undisputed amount.</p><p><br></p><p>&nbsp;</p><p>I, therefore, through this Notice finally call upon you to pay to my client Rs. __________/-. along with future interest @ __ % p.a. from the date of notice till actual realization of the said amount, together with notice fee of Rs. ____/- to my client either in cash or by demand draft or Cheque which ever mode suits you better, within clear 30 days from the date of receipt of this notice, failing which my client has given me clear instructions to file civil as well as criminal lawsuit for recovery and other Miscellaneous proceedings against you in the competent court of law and in that event you shall be fully responsible for the same.</p><p><br></p><p>A copy of this Notice has been preserved in my office for record and future course of action.</p><p><br></p><p>(____________)</p><p><br></p><p>&nbsp;</p><p>ADVOCATE</p><p><br></p>",
  },
];

const Home = () => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const [approvedLetters, setApprovedLetters] = useState([]);
  const [savedLetters, setSavedLetters] = useState([]);
  const [rejectedLetters, setRejectedLetters] = useState([]);

  const getAllPDFsFunc = async () => {
    const res = await scanAllPdfs();
    const temp_pdfs = JSON.parse(res["body"])["Items"];

    setApprovedLetters(
      temp_pdfs.filter((t) => t["approval"]["S"] === "approved")
    );
    setSavedLetters(temp_pdfs.filter((t) => t["saved"]["BOOL"]));
    setRejectedLetters(
      temp_pdfs.filter((t) => t["approval"]["S"] === "rejected")
    );
  };

  useEffect(() => {
    getAllPDFsFunc();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TVS Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={styles.logo}>
            <Image
              src="/tvs_logo.png" // Route of the image file
              height={80} // Desired size with correct aspect ratio
              width={200} // Desired size with correct aspect ratio
              alt="TVS Logo"
            />
          </div>

          <div className={styles.empInfo}>
            <div className={styles.empIcon}>R</div>
            <div className={styles.empDropdownContent}>
              <div
                className={styles.empDDList}
                onClick={() => {
                  localStorage.clear();
                  router.push("/");
                }}
              >
                Log Out
              </div>
            </div>
          </div>

          <div className={styles.empCont}>
            <div className={styles.empTitle}>Create a new letter</div>
            <div className={styles.listOfCards}>
              <div className={styles.listOCOuter}>
                <div className={styles.listOCInner}>
                  <div className={styles.createNewCard}>
                    <div className={styles.cardIcon}>
                      <Image
                        src="/icons/plus.svg" // Route of the image file
                        height={75} // Desired size with correct aspect ratio
                        width={75} // Desired size with correct aspect ratio
                        alt="TVS Logo"
                      />
                    </div>
                    <div className={styles.cardTitle}>Create from Scratch</div>
                  </div>

                  {templates_data.map((td, i) => (
                    <div
                      key={i}
                      className={styles.createNewCard}
                      onClick={() =>
                        router.push({
                          pathname: "/richtext",
                          query: {
                            temp_data: td["data"],
                            temp_name: td["temp_name"],
                          },
                        })
                      }
                    >
                      <div className={styles.cardTitle}>{td["temp_name"]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.empCont}>
            <div className={styles.empTitle}>Approved Letters</div>
            <div className={styles.listOfCards}>
              <div className={styles.listOCOuter}>
                {approvedLetters.length > 0 ? (
                  <div className={styles.listOCInner}>
                    {templates_data.map((td, i) => (
                      <div key={i} className={styles.createNewCard}>
                        <div className={styles.cardTitle}>
                          {td["temp_name"]}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noData}>Empty List!</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.empCont}>
            <div className={styles.empTitle}>Saved Letters</div>
            <div className={styles.listOfCards}>
              <div className={styles.listOCOuter}>
                {savedLetters.length > 0 ? (
                  <div className={styles.listOCInner}>
                    {templates_data.map((td, i) => (
                      <div key={i} className={styles.createNewCard}>
                        <div className={styles.cardTitle}>
                          {td["temp_name"]}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noData}>Empty List!</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.empCont}>
            <div className={styles.empTitle}>Rejected Letters</div>
            <div className={styles.listOfCards}>
              <div className={styles.listOCOuter}>
                {rejectedLetters.length > 0 ? (
                  <div className={styles.listOCInner}>
                    {templates_data.map((td, i) => (
                      <div key={i} className={styles.createNewCard}>
                        <div className={styles.cardTitle}>
                          {td["temp_name"]}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noData}>Empty List!</div>
                )}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
