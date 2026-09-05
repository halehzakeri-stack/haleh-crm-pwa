import Cocoa
import WebKit

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
    private var window: NSWindow!
    private var webView: WKWebView!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.allowsMagnification = true

        window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1280, height: 820),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered,
            defer: false
        )
        window.title = "CRM هالین"
        window.titlebarAppearsTransparent = true
        window.minSize = NSSize(width: 390, height: 650)
        window.contentView = webView
        window.center()
        window.makeKeyAndOrderFront(nil)

        loadCRM()
        NSApp.activate(ignoringOtherApps: true)
    }

    private func loadCRM() {
        guard let url = URL(string: "https://halehzakeri-stack.github.io/haleh-crm-pwa/?v=sidebar-v64-macos#/today") else { return }
        webView.load(URLRequest(url: url, cachePolicy: .reloadRevalidatingCacheData))
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        showOfflineMessage()
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        showOfflineMessage()
    }

    private func showOfflineMessage() {
        let html = """
        <!doctype html><html dir="rtl" lang="fa"><meta charset="utf-8">
        <style>body{font-family:-apple-system;margin:0;display:grid;place-items:center;height:100vh;background:#fafafa;color:#17171b;text-align:center}button{border:0;border-radius:14px;background:#5b35d5;color:#fff;padding:13px 28px;font-size:16px}</style>
        <body><main><h2>اتصال اینترنت برقرار نیست</h2><p>برای دریافت اطلاعات CRM، اتصال را بررسی کنید.</p><button onclick="location.href='https://halehzakeri-stack.github.io/haleh-crm-pwa/?v=sidebar-v64-macos#/today'">تلاش دوباره</button></main></body></html>
        """
        webView.loadHTMLString(html, baseURL: nil)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
