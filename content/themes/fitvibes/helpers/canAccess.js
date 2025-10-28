// helpers/canAccess.js
module.exports = function canAccess(options) {
    const root = options.data.root;
    const member = root['@member'];
    const post = root.post || this;
    const visibility = post?.visibility || 'public';

    if (member && member.isAdmin?.()) {
        return options.fn(this);
    }

    let hasAccess = false;
    switch (visibility) {
        case 'public': hasAccess = true; break;
        case 'members': hasAccess = !!member; break;
        case 'paid':
        case 'tiers': hasAccess = !!(member && member.paid); break;
        default: hasAccess = false;
    }

    return hasAccess ? options.fn(this) : options.inverse(this);
};