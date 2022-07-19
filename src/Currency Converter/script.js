// currency vis-a-vis country table
let countryList={AED:"AE",AFN:"AF",XCD:"AG",ALL:"AL",AMD:"AM",ANG:"AN",AOA:"AO",AQD:"AQ",ARS:"AR",AUD:"AU",AZN:"AZ",BAM:"BA",BBD:"BB",BDT:"BD",XOF:"BE",BGN:"BG",BHD:"BH",BIF:"BI",BMD:"BM",BND:"BN",BOB:"BO",BRL:"BR",BSD:"BS",NOK:"BV",BWP:"BW",BYR:"BY",BZD:"BZ",CAD:"CA",CDF:"CD",XAF:"CF",CHF:"CH",CLP:"CL",CNY:"CN",COP:"CO",CRC:"CR",CUP:"CU",CVE:"CV",CYP:"CY",CZK:"CZ",DJF:"DJ",DKK:"DK",DOP:"DO",DZD:"DZ",ECS:"EC",EEK:"EE",EGP:"EG",ETB:"ET",EUR:"FR",FJD:"FJ",FKP:"FK",GBP:"GB",GEL:"GE",GGP:"GG",GHS:"GH",GIP:"GI",GMD:"GM",GNF:"GN",GTQ:"GT",GYD:"GY",HKD:"HK",HNL:"HN",HRK:"HR",HTG:"HT",HUF:"HU",IDR:"ID",ILS:"IL",INR:"IN",IQD:"IQ",IRR:"IR",ISK:"IS",JMD:"JM",JOD:"JO",JPY:"JP",KES:"KE",KGS:"KG",KHR:"KH",KMF:"KM",KPW:"KP",KRW:"KR",KWD:"KW",KYD:"KY",KZT:"KZ",LAK:"LA",LBP:"LB",LKR:"LK",LRD:"LR",LSL:"LS",LTL:"LT",LVL:"LV",LYD:"LY",MAD:"MA",MDL:"MD",MGA:"MG",MKD:"MK",MMK:"MM",MNT:"MN",MOP:"MO",MRO:"MR",MTL:"MT",MUR:"MU",MVR:"MV",MWK:"MW",MXN:"MX",MYR:"MY",MZN:"MZ",NAD:"NA",XPF:"NC",NGN:"NG",NIO:"NI",NPR:"NP",NZD:"NZ",OMR:"OM",PAB:"PA",PEN:"PE",PGK:"PG",PHP:"PH",PKR:"PK",PLN:"PL",PYG:"PY",QAR:"QA",RON:"RO",RSD:"RS",RUB:"RU",RWF:"RW",SAR:"SA",SBD:"SB",SCR:"SC",SDG:"SD",SEK:"SE",SGD:"SG",SKK:"SK",SLL:"SL",SOS:"SO",SRD:"SR",STD:"ST",SVC:"SV",SYP:"SY",SZL:"SZ",THB:"TH",TJS:"TJ",TMT:"TM",TND:"TN",TOP:"TO",TRY:"TR",TTD:"TT",TWD:"TW",TZS:"TZ",UAH:"UA",UGX:"UG",USD:"US",UYU:"UY",UZS:"UZ",VEF:"VE",VND:"VN",VUV:"VU",YER:"YE",ZAR:"ZA",ZMK:"ZM",ZWD:"ZW"}

let API_KEY = "b96b8a2ac70e59871ed0" //you might want to change it, but feel free to use mine 

window.onload=function() {
    const countrySelect = $('#form select')
    for (let i=0;i<countrySelect.length;++i){  // for both to (1) and from (0)
        for(let cc in countryList){
            // select from USD to INR as default
            let selected = i == 0 ? (cc == "USD" ? "selected" : "") : (cc == "INR" ? "selected" : "")
            // insert new option for the list
            $(countrySelect[i]).append(`<option value="${cc}" ${selected}>${cc}</option>`)
        }
        countrySelect[i].addEventListener("change", e =>{
            // load flag of country code cc and load it for (to/from)
            // console.log()
            setFlag(countrySelect[i].value,i==0 ? 'from' : 'to') 
        });
    }

    function setFlag(cc,tofrom){
        console.log(cc,tofrom);
        for(let c in countryList)
            if(c == cc){ // if currency code of country list is equal to option value
                let imgTag = $(`.${tofrom} img`); // selecting img tag of particular drop list
                // passing country code of a selected currency code in a img url
                imgTag.attr('src',`https://flagcdn.com/48x36/${countryList[c].toLowerCase()}.png`)
            }
    }

    $('button').click(getExchangeRate)
    
    const fromC = $('.from select')
    const toC   = $('.to select')

    function getExchangeRate(){
        const amt = $("#form input")
        const label = $("div.exchange-rate")
    
        let amount = amt.val()
        if (amount.trim()==''){
            amt.val('1')
            amount = 1
        }
    
        label.html("Getting exchange rate...")
        console.log(fromC.val(),toC.val(),amount)
        const term = `${fromC.val()}_${toC.val()}` //perks of the API xD
        fetch(`https://free.currconv.com/api/v7/convert?q=${term}&compact=ultra&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                label.html(`${amount} ${fromC.val()} = ${amount*result[term]} ${toC.val()}`)
            }).catch(error =>
                label.html("Something went Wrong...")
            );
    }

    const exchangeIcon = $(".icon")
    exchangeIcon.click(()=>{
        //swap to and from
        let tempCode = fromC.val(); 
        fromC.val(toC.val())
        toC.val(tempCode) 
        //reload flags for their new values
        setFlag(toC.val(),'to'); 
        setFlag(fromC.val(),'from'); 
        getExchangeRate(); 
    })

    getExchangeRate()

}

