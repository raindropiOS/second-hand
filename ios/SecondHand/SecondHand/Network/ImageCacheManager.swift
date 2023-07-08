//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/07.
//

import UIKit.UIImage
import Foundation

class ImageCacheManager {
    static let shared = NSCache<NSString, UIImage>()
    
    init() { }
}

extension UIImageView {
    func loadImage(_ imageID: String) {
        let cacheKey = NSString(string: imageID)
        // 메모리 캐시에서 이미지 검색
        if let cachedImage = ImageCacheManager.shared.object(forKey: cacheKey) {
        self.image = cachedImage
        return
        }
        
        // url에서 이미지를 비동기 로드
        NetworkManager.shared.loadImage(from: imageID) { image in
            guard let image = image else { return }
            ImageCacheManager.shared.setObject(image, forKey: cacheKey)
            DispatchQueue.main.async {
                self.image = image
            }
        }
    }
}
