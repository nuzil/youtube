module.exports = {
    resolvers: {
        SimpleProduct: {//should be done for each product type because it's doesn't work for interfaces for example ProductInterface
            media_gallery: {
                selectionSet: '{ media_gallery external_images name sku }',//fields needed to resolver
                resolve: (root) => {
                    // if(root || args || context || info){
                    // root = root
                    // Do not ignore root, args, context, or info. They may be needed for future enhancements.
                    // }
                    if (!root.external_images) {
                        return []; // Return empty array if external_images is empty
                    }

                    const urls = root.external_images.split(',').map(url => url.trim());
                    return urls.map((url, index) => ({
                        __typename: 'ProductImage',
                        position: index + 1,
                        label: `${root.name}`, // Use SimpleProduct.name as label
                        url,
                        disabled: false
                    }));
                },
            },
        },
    },
};