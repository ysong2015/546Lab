(function ($) {
    var errorAlert = $("#error-message");
    var form1_btn_submit = $("#form1_btn_submit");
    var form2_btn_submit = $("#form2_btn_submit");
    var form3_btn_submit = $("#form3_btn_submit");

    function validateForm1() {
        var form1_input_years = $('#form1_input_years');
        var form1_input_perMonth = $('#form1_input_perMonth');
        var form1_input_interestRate = $('#form1_input_interestRate');
        var form1_value_years = form1_input_years.val();
        var form1_value_perMonth = form1_input_perMonth.val();
        var form1_value_interestRate = form1_input_interestRate.val();

        if (form1_value_years === undefined || form1_value_years === "" || form1_value_years === null) {
            throw "No years value provided";
        }
        if (form1_value_perMonth === undefined || form1_value_perMonth === "" || form1_value_perMonth === null) {
            throw "No perMonth value provided";
        }
        if (form1_value_interestRate === undefined || form1_value_interestRate === "" || form1_value_interestRate === null) {
            throw "No interestRate value provided";
        }

        var years_number = parseInt(form1_value_years);
        var perMonth_number = parseInt(form1_value_perMonth);
        var interestRate_number = parseInt(form1_value_interestRate);

        if (isNaN(years_number) || years_number < 0) {
            throw "First value is not a positive number";
        }
        if (isNaN(perMonth_number) || perMonth_number < 0) {
            throw "Second value is not a positive number";
        }
        if (isNaN(interestRate_number) || interestRate_number) {
            throw "Second value is not a positive number";
        }
    }

    function validateForm2() {
        var form2_input_years = $('#form2_input_years');
        var form2_input_initial = $('#form2_input_initial');
        var form2_input_interestRate = $('#form2_input_interestRate');
        var form2_value_years = form2_input_years.val();
        var form2_value_initial = form2_input_initial.val();
        var form2_value_interestRate = form2_input_interestRate.val();

        if (form2_value_years === undefined || form2_value_years === "" || form2_value_years === null) {
            throw "No years value provided";
        }
        if (form2_value_initial === undefined || form2_value_initial === "" || form2_value_initial === null) {
            throw "No initial value provided";
        }
        if (form2_value_interestRate === undefined || form2_value_interestRate === "" || form2_value_interestRate === null) {
            throw "No interestRate value provided";
        }

        var years_number = parseInt(form2_value_years);
        var initial_number = parseInt(form2_value_initial);
        var interestRate_number = parseInt(form2_value_interestRate);

        if (isNaN(years_number) || years_number < 0) {
            throw "First value is not a positive number";
        }
        if (isNaN(initial_number) || initial_number < 0) {
            throw "Second value is not a positive number";
        }
        if (isNaN(interestRate_number) || interestRate_number) {
            throw "Second value is not a positive number";
        }
    }

    function validateForm3() {
        var form3_input_monthlyAmount = $('#form3_input_monthlyAmount');
        var form3_input_loanAmount = $('#form3_input_loanAmount');
        var form3_input_interestRate = $('#form3_input_interestRate');
        var form3_value_monthlyAmount = form3_input_monthlyAmount.val();
        var form3_value_loanAmount = form3_input_loanAmount.val();
        var form3_value_interestRate = form3_input_interestRate.val();

        if (form3_value_monthlyAmount === undefined || form3_value_monthlyAmount === "" || form3_value_monthlyAmount === null) {
            throw "No monthlyAmoun value provided";
        }
        if (form3_value_loanAmount === undefined || form3_value_loanAmount === "" || form3_value_loanAmount === null) {
            throw "No monthlyAmoun value provided";
        }
        if (form3_value_interestRate === undefined || form3_value_interestRate === "" || form3_value_interestRate === null) {
            throw "No interestRate value provided";
        }

        var monthlyAmount_number = parseInt(form3_value_monthlyAmount);
        var loanAmount_number = parseInt(form3_value_loanAmount);
        var interestRate_number = parseInt(form3_value_interestRate);

        if (isNaN(monthlyAmount_number) || monthlyAmount_number < 0) {
            throw "First value is not a positive number";
        }
        if (isNaN(loanAmount_number) || loanAmount_number < 0) {
            throw "Second value is not a positive number";
        }
        if (isNaN(interestRate_number) || interestRate_number) {
            throw "Second value is not a positive number";
        }
    }

    form1_btn_submit.click(function (e) {
        try {
            validateForm1();
        } catch (error) {
            e.preventDefault();
            errorAlert.text(error);
            errorAlert.removeClass('hidden');
        }
    });

    form2_btn_submit.click(function (e) {
        try {
            validateForm2();
        } catch (error) {
            e.preventDefault();
            errorAlert.text(error);
            errorAlert.removeClass('hidden');
        }
    });

    form3_btn_submit.click(function (e) {
        try {
            validateForm3();
        } catch (error) {
            e.preventDefault();
            errorAlert.text(error);
            errorAlert.removeClass('hidden');
        }
    });
})(jQuery);