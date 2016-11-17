const  BILLION = 1000000000;
const  MILLION = 1000000;
const THOUSAND = 1000;

var ones=['','one','two','three','four','five','six','seven','eight','nine'];
var tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
var teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

var convertBillions = function (num){
    if (num >= BILLION)
        return convertBillions(Math.floor(num/BILLION))+" billion "+convertMillions(num%BILLION);
    else
        return convertMillions(num);
};

var convertMillions = function (num){
    if (num >= MILLION)
        return convertMillions(Math.floor(num/MILLION))+" million "+convertThousands(num%MILLION);
    else
        return convertThousands(num);
};

var convertThousands = function (num){
    if (num >= THOUSAND)
        return convertHundreds(Math.floor(num/THOUSAND))+" thousand "+convertHundreds(num%THOUSAND);
    else
        return convertHundreds(num);
};

var convertHundreds = function (num){
    if (num > 99)
        return ones[Math.floor(num/100)]+" hundred "+convertTens(num%100);
    else
        return convertTens(num);
};

var convertTens = function (num){
    if (num < 10) return ones[num];
    else if (num>=10 && num<20) return teens[num-10];
    else return tens[Math.floor(num/10)]+" "+ones[num%10];
};

module.exports = function convert(num){
    if (num==0) return "zero";
    else return convertBillions(num).trim();
};
