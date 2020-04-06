import { writeFile } from 'rxline/fs';
import { StaticRenderer } from '@connectv/sdh';
import { PostProcessPlugin } from '@connectv/sdh/transport';
import { CompProcessPlugin } from '@connectv/html';

import { ThemePlugin } from './theme';


/**
 *
 * A rendering plugin representing an external stylesheet containing styles of a given theme.
 * Wraps a `ThemePlugin` object, adding an external stylesheet reference to a given HTML document
 * in post-processing and providing a method for saving the external stylesheet file.
 *
 * @note This class is designed to be used ON SERVER-SIDE ONLY, since you cannot create external stylesheets
 * on the client-side. Be careful not to accidentally import it in your client-side bundles.
 *
 */
export class ExternalSheet<ThemeType, R, T> implements PostProcessPlugin<R, T>, CompProcessPlugin<R, T> {
  /**
   *
   * the path that the external stylesheet should be stored on on the filesystem.
   *
   */
  path: string;

  /**
   *
   * @param theme the wrapped theme plugin
   * @param url   the url on which the external stylesheet should be accessible
   * @param path  the path on which the external stylesheet should be stored
   *
   */
  constructor(
    readonly theme: ThemePlugin<ThemeType, R, T>,
    readonly url: string, path?: string
  ) {
    this.path = path || this.url;
  }

  /**
   *
   * Will add a link to the external stylesheet to the `head` of given html.
   *
   * @param html
   *
   */
  post(html: HTMLDocument): void | Promise<void> {
    const renderer = new StaticRenderer();
    renderer.render(<link href={this.url} rel="stylesheet"/>).on(html.head);
  }

  /**
   *
   * Will save the external stylesheet to the filesystem.
   *
   * @returns a Promise resolving to the saved `File`.
   *
   */
  save() {
    return writeFile()({
      path: this.path,
      root: '',
      content: this.theme.registry.toString()
    });
  }

  get priority() { return this.theme.priority }

  prepare(_: any, __: any, ___: any, ____: any): (result: Node) => void {
    return this.theme.prepare(_, __, ___, ____);
  }
}


/**
 *
 * Creates an external stylesheet wrapper around given theme plugin. This plugin
 * can be plugged into a `StaticRenderer` to ensure components have access to the theme
 * and can use it to register their themed styles, and to ensure that the external
 * stylesheet is linked on the final HTML document. Note that you would need to save
 * the stylesheet yourself independently.
 *
 * Example:
 * ```tsx
 * import { compile } from '@connectv/sdh';
 * 
 * const styles = externalSheet(theme({
 *   background: 'black',
 *   text: 'white',
 *   primary: 'red'
 * }));
 *
 * compile(renderer => ..., styles)
 * .save()
 * .then(() => styles.save());
 * ```
 *
 * @param theme the theme plugin to be contained within the stylesheet
 * @param url   the url on which the stylesheet is to be accessible
 * @param path  the filesystem path on which the stylesheet is to be stored. defaults to `url`.
 *
 */
export function externalSheet<ThemeType=any, R=any, T=any>(
  theme: ThemePlugin<ThemeType, R, T>, 
  url: string, 
  path?: string
) {
  return new ExternalSheet(theme, url, path);
}
