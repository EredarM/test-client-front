export const urlBuilderV2 = (url: string, params?: URLSearchParams) => {
    const urlBuilder = new URL(url);
    if (params) {
        urlBuilder.search = params.toString();
    }
    return urlBuilder;
}