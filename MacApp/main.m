#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, WKNavigationDelegate>
@property NSWindow *window;
@property WKWebView *webView;
@end

@implementation AppDelegate
- (void)applicationDidFinishLaunching:(NSNotification *)notification {
    WKWebViewConfiguration *configuration = [WKWebViewConfiguration new];
    configuration.websiteDataStore = WKWebsiteDataStore.defaultDataStore;
    self.webView = [[WKWebView alloc] initWithFrame:NSZeroRect configuration:configuration];
    self.webView.navigationDelegate = self;
    self.webView.allowsMagnification = YES;

    NSRect frame = NSMakeRect(0, 0, 1280, 820);
    NSWindowStyleMask style = NSWindowStyleMaskTitled | NSWindowStyleMaskClosable |
        NSWindowStyleMaskMiniaturizable | NSWindowStyleMaskResizable | NSWindowStyleMaskFullSizeContentView;
    self.window = [[NSWindow alloc] initWithContentRect:frame styleMask:style backing:NSBackingStoreBuffered defer:NO];
    self.window.title = @"CRM هالین";
    self.window.titlebarAppearsTransparent = YES;
    self.window.minSize = NSMakeSize(390, 650);
    self.window.contentView = self.webView;
    [self.window center];
    [self.window makeKeyAndOrderFront:nil];

    NSURL *url = [NSURL URLWithString:@"https://halehzakeri-stack.github.io/haleh-crm-pwa/?v=sidebar-v64-macos#/today"];
    [self.webView loadRequest:[NSURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadRevalidatingCacheData timeoutInterval:30]];
    [NSApp activateIgnoringOtherApps:YES];
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender { return YES; }

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    NSString *html = @"<!doctype html><html dir='rtl' lang='fa'><meta charset='utf-8'><style>body{font-family:-apple-system;margin:0;display:grid;place-items:center;height:100vh;background:#fafafa;color:#17171b;text-align:center}button{border:0;border-radius:14px;background:#5b35d5;color:#fff;padding:13px 28px;font-size:16px}</style><body><main><h2>اتصال اینترنت برقرار نیست</h2><p>برای دریافت اطلاعات CRM، اتصال را بررسی کنید.</p><button onclick=\"location.href='https://halehzakeri-stack.github.io/haleh-crm-pwa/?v=sidebar-v64-macos#/today'\">تلاش دوباره</button></main></body></html>";
    [webView loadHTMLString:html baseURL:nil];
}
@end

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        NSApplication *app = NSApplication.sharedApplication;
        AppDelegate *delegate = [AppDelegate new];
        app.delegate = delegate;
        [app setActivationPolicy:NSApplicationActivationPolicyRegular];
        [app run];
    }
    return 0;
}
