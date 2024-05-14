
function productload()
{
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    var product = urlParams.get('product');

    if (product == 1) {
        document.getElementById("background").style = "background-image: url('IMG/protection1.png')";
        document.getElementById("topic").innerHTML = "Assure Shield";
        document.getElementById("introduction").innerHTML = "A children's life insurance policy is designed to provide coverage for various contingencies while prioritizing the well-being of the child. Here are the details of a policy that covers all hospital payments and provides coverage for death, disability, and accidents.";
        document.getElementById("description").innerHTML = "<li>Coverage up to Rs 10 Million - choose  plans that provide comprehensive protection for you and your family.</li>\n\
    <li>Cashless Hospitalisation - access to over 60 hospitals.</li>\n\
    <li>Non-paying ward benefits : Per day cash benefits + reimbursement of additional expenses.</li>\n\
    <li> No Claim Benefit : that doubles your benefit amount in 4 years free of charge.</li>\n\
    <li>Death Benefit Coverage: In the unfortunate event of the child's death, the policy provides a death benefit to the designated beneficiary, typically the\n\
      child's parents or legal guardians. This benefit amount is paid out as a lump sum and can help the family cope with the financial impact\n\
       of the loss, such as funeral expenses, outstanding debts, or ongoing financial obligations.</li>\n\
     <li>Accidental Injury Coverage: The policy also offers coverage for accidental injuries. If the child sustains injuries due\n\
     to accidents, such as falls, burns, or sports-related incidents, the policy will provide financial assistance to cover\n\
      medical expenses, rehabilitation costs, and other related expenses.</li>\n\
      <li>A birthday gift each year from their 18th to 49th birthday.</li>\n\
      <li> Pre & Post Hospitalization Expense Benefits and much more</li>\n\
    <h4>It's important to note that the specific terms and conditions, coverage limits, and exclusions may vary depending on the insurance company and the policy chosen.\n\
      It is advisable to carefully review the policy documentation and consult with an insurance agent or representative to fully understand the coverage details\n\
      and any additional features or benefits provided by the policy.</h4>";
    } else if (product == 2) {
        document.getElementById("background").style = "background-image: url('IMG/protection2.jpg')";
        document.getElementById("topic").innerHTML = "Assure Elite";
        document.getElementById("introduction").innerHTML = "A children's life insurance policy that covers all hospital payments and provides coverage for critical illnesses and disabilities offers comprehensive protection for the child's well-being.\n\
    Here are the details of such a policy:";
        document.getElementById("description").innerHTML = " <li>Total Permanent Disablement benefit.</li>\n\
    <li>Non-paying ward benefits : Per day cash benefits + reimbursement of additional expenses.</li>\n\
    <li>Hospital Payments Coverage: The policy covers all hospital payments related to the child's medical treatment and care.</li>\n\
    <li>This includes expenses such as hospitalization, surgeries, medical tests, doctor consultations, medications, and\n\
    other necessary treatments. The insurance company will either reimburse the policyholder for these expenses or directly pay the hospital bills on their behalf.</li>\n\
    <li>Disability Benefit Coverage: The policy includes coverage for disability resulting from an accident or illness. If the child becomes disabled and is unable to perform regular activities or requires special\n\
     care and assistance, the policy will provide financial support. This may include ongoing monthly payments or a lump-sum payout, depending\n\
      on the terms of the policy.</li>\n\
      <li>Critical Illness Coverage: The policy provides coverage for critical illnesses that may affect the child's health.\n\
     Critical illnesses typically include serious and life-threatening conditions such as cancer, heart disease, stroke, organ failure, and certain genetic disorders. If the child is diagnosed with a covered critical\n\
     illness, the policy will pay out a lump sum or provide ongoing financial support to help cover medical expenses, treatments, and other associated costs.</li>\n\
     <li>Additional Benefits: Depending on the specific policy, there may be additional benefits included. These can vary but may include benefits such as education funds for the child's future, counseling services for the\n\
    child and family, or access to specialized medical networks or facilities for enhanced treatment options.</li>\n\
    <li>A birthday gift each year from their 18th to 49th birthday.</li>\n\
    <li>Pre & Post Hospitalization Expense Benefits and much more</li>";
    } else if (product == 3) {
        document.getElementById("background").style = "background-image: url('IMG/child1.png')";
        document.getElementById("topic").innerHTML = "Assure Guardian";
        document.getElementById("introduction").innerHTML = "A children's insurance policy is designed to provide comprehensive coverage for various contingencies, prioritizing the well-being of your child. This policy covers all hospital payments associated with your child's \n\
    medical treatment and care, ensuring that you are not burdened by financial expenses during their illness or injury. In addition to hospital payment coverage, the policy provides protection in the unfortunate event of\n\
    your child's death, offering financial support to help your family cope with this devastating loss. Furthermore, the policy includes coverage for disabilities resulting from accidents or illnesses, ensuring that your\n\
    child receives the necessary support and resources for their well-being and development. Lastly, the policy extends coverage to accidents, providing financial assistance to cover medical expenses and related costs\n\
    if your child sustains injuries due to unforeseen incidents. With this children's insurance policy, you can have peace of mind knowing that your child's hospital payments are taken care of, and they are protected against\n\
     potential financial hardships caused by death, disability, and accidents.";
        document.getElementById("description").innerHTML = " <li>A lump sum payment amounting to 150% of the Insured Amount on their 50th birthday.</li>\n\
    <li>Protection for your child until 50 years of age.</li>\n\
    <li>A Life insurance cover that will grow by 100% every 10 years, starting from their 25th birthday.</li>\n\
   <li>Total Permanent Disablement benefit.</li>\n\
    <li>A birthday gift each year from their 18th to 49th birthday.</li>  ";
    } else if (product == 4) {
        document.getElementById("background").style = "background-image: url('IMG/child2.png')";
        document.getElementById("topic").innerHTML = "Assure Future+";
        document.getElementById("introduction").innerHTML = "Is protecting your child's future a top concern? Then 'Assure Future+' is the only option left. You can create a sizeable fund to invest in your children's higher education goals with the help of this innovative children's plan.\n\
    Additionally, it offers quarterly payments during the final five years of the plan. In addition to the advantages listed above, if something were to happen to you, your family and child would get a lump payment to assist \n\
    them maintain their standard of living.";
        document.getElementById("description").innerHTML = "<li>Two funds can assist in ensuring your child has the greatest education</li>\n\
    <li>You can arrange for the child to receive quarterly lump sum payments for the last five years of their schooling while they are studying at the Ordinary and Advanced levels.</li>\n\
    <li>In the event of a parent's passing or handicap, protection benefits will ensure your child's educational advancement financially.</li>\n\
    <li>At the conclusion of the plan, a second lump sum payment will be made to support your child's tertiary education.</li>\n\
    <li>In the event of a parent's passing or handicap, protection benefits will ensure your child's educational advancement financially.</li>\n\
    <li>If you choose, you can use the cover to insure your child's hospitalization.</li>";
    } else if (product == 5) {
        document.getElementById("background").style = "background-image: url('IMG/retirment.jpg')";
        document.getElementById("topic").innerHTML = "Assure Retirment Guard";
        document.getElementById("introduction").innerHTML = "Assure Retirement Guard is a truly unique insurance plan that requires you to pay only up to 20 years. making it a very exceptional insurance plan. You will receive a sizable maturity benefit after the 20-year mark, but your\n\
    protection doesn't end there. In fact, it continues for the rest of your life—unlimited protection, as the name implies!";
        document.getElementById("description").innerHTML = " <li>A lifetime of protection, even after the policy matures</li>\n\
    <li>Lifetime hospitalization benefit: reimbursement benefit or per day hospital cash benefit.</li>\n\
    <li>Lifetime Life Insurance benefit: accident or natural death.</li>\n\
    <li>A guaranteed maturity benefit - maturity benefit worth 150% of Sum Insured.</li>\n\
    <li>Freedom to select the time period you want to save for.</li>\n\
    <li>Your savings will grow year after year</li>\n\
    <li>A guaranteed minimum return.</li>\n\
    <li>Maturity benefit for you at the end of the term.</li>\n\
    <li>Maturity value is tax free.</li>\n\
    <li>A range of optional protection benefits for you to select from</li>";
    } else if (product == 6) {
        document.getElementById("background").style = "background-image: url('IMG/savings1.png')";
        document.getElementById("topic").innerHTML = "Assure Savings";
        document.getElementById("introduction").innerHTML = "Is sending your child to college abroad your ultimate dream? or do you and your partner\n\
    intend to visit a new place every year? or is it to have a comfortable retirement? \n\
    Whatever stage of life you're in,Assure Savings will make it easy for you to fulfill all of your goals. Fix, then unwind by taking a seat.";
        document.getElementById("description").innerHTML = " <li>There should be a minimum investment of 1 million rupees.</li>\n\
    <li>Maximum security for your investment while paying the biggest dividend.</li>\n\
    <li>Withdraw the dividend at specified intervals of your choosing, such as every month, every quarter, every half-year, or every year.\n\
     <li>You would receive a dividend transfer to your bank account.</li>\n\
     <li>No unforeseen fees.</li>\n\
     <li>Built-in life and accident death insurance.</li>\n\
     <li>In an emergency, you can withdraw your funds at any time, making it very flexible.</li>";
    } else if (product == 7) {
        document.getElementById("background").style = "background-image: url('IMG/savings2.png')";
        document.getElementById("topic").innerHTML = "Assure Flex";
        document.getElementById("introduction").innerHTML = "Assure Flex savings policy gives a fantastic savings strategy with the additional advantage of a useful dividend. Here are the specifics of such a policy, which also allows for flexibility in making the initial deposit payment";
        document.getElementById("description").innerHTML = "<li>Savings Program: The policy offers a methodical savings program to assist people in building up their financial reserves over time.</li>\n\
    <li>Dividends: The policy includes dividends, which are payments made to policyholders from the insurer's profits as a second source of income.</li>\n\
    <li>Initial Deposit Flexibility: The insurance gives policyholders the opportunity to pay the initial deposit in a variety of ways,\n\
    taking into account their preferences and financial circumstances.</li>\n\
   <li>Additional o Benefits: Depending on the exact policy, there may be other benefits including the opportunity to borrow money against the \n\
    accumulated savings or make partial withdrawals from them, the flexibility to change the amount of savings as necessary, and optional insurance coverage or riders.</li>";
    }
}
