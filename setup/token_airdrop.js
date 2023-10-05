const anchor = require("@coral-xyz/anchor");
const {
	getAssociatedTokenAddress,
} = require("@solana/spl-token");

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.SplTokenFaucet;

const amount = 10000;

async function airdrop_usdc() {
	console.log("provider address: " + provider.wallet.publicKey.toString());
	console.log("payer address: " + provider.wallet.publicKey.toString());

	const amountToAirdrop = new anchor.BN(amount * 1000000);

	const [mintPda, _] =
		await anchor.web3.PublicKey.findProgramAddressSync(
			[Buffer.from(anchor.utils.bytes.utf8.encode("faucet-mint"))],
			program.programId
		);

	const associatedTokenAccount = await getAssociatedTokenAddress(
		mintPda,
		program.provider.wallet.publicKey
	);

	const txn = await program.methods.airdrop(amountToAirdrop).accounts({
			user: program.provider.wallet.publicKey,
			mint: mintPda,
			tokenAccount: associatedTokenAccount,
	}).rpc();


	console.log("Your transaction signature", txn);
}

airdrop_usdc();
