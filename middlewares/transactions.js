module.exports = {
    validateTransaction: (req, res, next) => {
        const {
            ammount,
            type,
            spends_category,
            income_category,
        } = req.body;

        if(!ammount || isNaN(ammount) || ammount < 0) return res.status(400).json({
            error: "ammount: required, it must be a number and greather than 0."
        });

        if(!type || type !== "income" && type !== "spends") return res.status(400).json({
            error: "type: required, it must be a string and should be \"income\" or \"spends\"."
        });

        if(!spends_category && !income_category) return res.status(400).json({
            error: `${type}_category: required, it must be a string describing the ${type}.`
        });

        if(spends_category && income_category) return res.status(400).json({
            error: "category: can't have an income and spends category at the same time."
        });

        next();
    }
}