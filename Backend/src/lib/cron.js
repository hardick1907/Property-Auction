import cron from 'node-cron';
import Property from '../models/property.model.js';
import { transporter } from './nodemailer.js';

const sendWinnerEmails = async () => {
    try {
        const currentDateTime = new Date();

        const endedAuctions = await Property.find({
            endDate: { $lt: currentDateTime }, // Auction end date is in the past
            notified: false,
            status: "Vacant"
        }).populate('highestBidder');

        console.log(`Found ${endedAuctions.length} ended auctions to process`);

        for (const auction of endedAuctions) {
            // Ensure the auction truly has a highest bid
            if (auction.biddingHistory.length > 0) {
                const highestBid = auction.biddingHistory
                    .sort((a, b) => parseFloat(b.bidAmount) - parseFloat(a.bidAmount))[0];

                if (highestBid && highestBid.bidder) {
                    const bidderEmail = highestBid.bidder.email;
                    const bidderName = highestBid.bidder.name;
                    const formattedBidAmount = new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    }).format(parseFloat(highestBid.bidAmount));

                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: bidderEmail,
                        subject: `Congratulations! You won the auction for ${auction.title}`,
                        html: `
                            <h2>Congratulations ${bidderName}!</h2>
                            <p>You have won the auction for the property "${auction.title}" with a winning bid of ${formattedBidAmount}.</p>
                            <p>Property Details:</p>
                            <ul>
                                <li>Address: ${auction.address}</li>
                                <li>City: ${auction.city}</li>
                                <li>State: ${auction.state}</li>
                            </ul>
                            <p>Please contact us to finalize the process.</p>
                            <p>Thank you for participating!</p>
                        `,
                    };

                    await transporter.sendMail(mailOptions);
                    console.log(`Winner notification email sent to: ${bidderEmail}`);

                    // Update auction status and notification flag
                    auction.status = "Booked";
                    auction.notified = true;
                    auction.highestBidder = {
                        id: highestBid.bidder.id,
                        name: highestBid.bidder.name,
                        email: highestBid.bidder.email
                    };
                    await auction.save();
                }
            }
        }
    } catch (error) {
        console.error("Error in cron job:", error);
    }
};

function startCron() {
    // Run every hour instead of every minute to reduce unnecessary checks
    cron.schedule('* * * * *', sendWinnerEmails);
    console.log("Auction winner notification cron job started");
}

export default startCron;
