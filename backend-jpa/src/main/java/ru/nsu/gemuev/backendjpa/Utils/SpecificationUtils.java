package ru.nsu.gemuev.backendjpa.Utils;

import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import ru.nsu.gemuev.backendjpa.entity.Tourist;

@UtilityClass
public class SpecificationUtils {
    public static <T> @NonNull Specification<T> equalSpec(@NonNull String fieldName,
                                                          @NonNull Object value) {
        return (root, cq, cb) -> cb.equal(root.get(fieldName), value);
    }
}
